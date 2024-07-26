require('dotenv').config();
const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

// Create Product
router.post('/', async (req, res) => {
  const { title, subtitle, starCount, verified, price, weight, category } = req.body;

  try {
    const newProduct = new Product({
      title,
      subtitle,
      starCount,
      verified,
      price,
      weight,
      category,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Product
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, subtitle, starCount, verified, price, weight, category } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { title, subtitle, starCount, verified, price, weight, category },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Product
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
