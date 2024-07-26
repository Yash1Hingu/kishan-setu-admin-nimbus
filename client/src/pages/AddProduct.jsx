import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Typography,
  Container,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Grid,
} from '@mui/material';
import { Navigate } from 'react-router-dom';

const AddProduct = ({ selectedProduct, setSelectedProduct }) => {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    starCount: '',
    verified: false,
    price: 0,
    weight: 0,
    category: '',
  });
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (selectedProduct) {
      setFormData(selectedProduct);
    }
  }, [selectedProduct]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleCategoryChange = (e) => {
    setFormData({
      ...formData,
      category: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedProduct) {
        await axios.put(`/api/products/${selectedProduct._id}`, formData);
        alert('Product updated successfully');
        setSelectedProduct(null); // Reset the selected product after update
      } else {
        await axios.post('/api/products', formData);
        alert('Product created successfully');
      }
      setRedirect(true);
    } catch (error) {
      alert('Error saving product');
    }
  };

  if (redirect) {
    return <Navigate to={'/'} />;
  }

  return (
    <Container maxWidth="md" sx={{ padding: '2rem', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
      <Typography variant="h4" gutterBottom sx={{ marginBottom: '1rem', color: '#333' }}>
        {selectedProduct ? 'Edit Product' : 'Add Product'}
      </Typography>
      <Divider sx={{ marginBottom: '1rem' }} />
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              margin="normal"
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              variant="outlined"
              sx={{ backgroundColor: '#fff' }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              margin="normal"
              label="Subtitle"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleChange}
              variant="outlined"
              sx={{ backgroundColor: '#fff' }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              margin="normal"
              label="Star Count"
              name="starCount"
              value={formData.starCount}
              onChange={handleChange}
              variant="outlined"
              sx={{ backgroundColor: '#fff' }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Checkbox
                  name="verified"
                  checked={formData.verified}
                  onChange={handleChange}
                />
              }
              label="Verified"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              margin="normal"
              label="Price"
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              variant="outlined"
              sx={{ backgroundColor: '#fff' }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              margin="normal"
              label="Weight"
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              variant="outlined"
              sx={{ backgroundColor: '#fff' }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={formData.category}
                onChange={handleCategoryChange}
                label="Category"
                variant="outlined"
                sx={{ backgroundColor: '#fff' }}
              >
                <MenuItem value="Fruits">Fruits</MenuItem>
                <MenuItem value="Vegetables">Vegetables</MenuItem>
                <MenuItem value="Dry Fruits">Dry Fruits</MenuItem>
                {/* Add more categories as needed */}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Box mt={2} textAlign="right">
          <Button type="submit" variant="contained" color="primary">
            {selectedProduct ? 'Update Product' : 'Create Product'}
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default AddProduct;
