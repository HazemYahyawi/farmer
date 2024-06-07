const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  farmer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Product', ProductSchema);
