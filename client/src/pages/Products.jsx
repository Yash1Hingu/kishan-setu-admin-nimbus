import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import AdminPanel from './AddProduct';
import { NavLink } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('');

  const fetchProducts = async () => {
    const response = await axios.get('/api/products', {
      params: { category: categoryFilter },
    });
    setProducts(response.data);
  };

  useEffect(() => {
    fetchProducts();
  }, [open, categoryFilter]);

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleDeleteConfirmation = (id) => {
    setDeleteId(id);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/products/${deleteId}`);
      setProducts(products.filter((product) => product._id !== deleteId));
      alert('Product deleted successfully');
    } catch (error) {
      alert('Error deleting product');
    }
    setDeleteId(null);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Products
      </Typography>
      <NavLink to='/addproduct'>
        <Button variant="contained" color="primary">
          Add Product
        </Button>
      </NavLink>
      <FormControl variant="outlined" style={{ marginBottom: '16px', width: '200px' }}>
        <InputLabel>Category</InputLabel>
        <Select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          label="Category"
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Fruits">Fruits</MenuItem>
          <MenuItem value="Vegetables">Vegetables</MenuItem>
          {/* Add more categories as needed */}
        </Select>
      </FormControl>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Subtitle</TableCell>
              <TableCell>Star Count</TableCell>
              <TableCell>Verified</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Weight</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products
              .filter((product) => categoryFilter === '' || product.category === categoryFilter)
              .map((product) => (
                <TableRow key={product._id}>
                  <TableCell>{product.title}</TableCell>
                  <TableCell>{product.subtitle}</TableCell>
                  <TableCell>{product.starCount}</TableCell>
                  <TableCell>{product.verified ? 'Yes' : 'No'}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.weight}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ marginRight: '8px' }}
                      onClick={() => handleEdit(product)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDeleteConfirmation(product._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <AdminPanel
            selectedProduct={selectedProduct}
            setSelectedProduct={setSelectedProduct}
            refreshProducts={fetchProducts}
            handleClose={handleClose}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={Boolean(deleteId)}
        onClose={() => setDeleteId(null)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>Are you sure you want to delete this product?</DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteId(null)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Products;
