const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  starCount: String,
  verified: Boolean,
  price: Number,
  weight: Number,
  category: { type: String, required: true },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
