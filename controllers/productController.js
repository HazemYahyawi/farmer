const Product = require('../models/productModel');
const Comment = require('../models/commentModel');

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addComment = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  try {
    const comment = await Comment.create({ product: id, buyer: req.user.id, content });
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getComments = async (req, res) => {
  const { id } = req.params;
  try {
    const comments = await Comment.find({ product: id });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllComments = async (req, res) => {
  try {
    console.log('Received request to fetch all comments:', req.method, req.url); // Log request details
    const comments = await Comment.find();
    console.log('Comments fetched successfully:', comments.length); // Log number of comments fetched
    res.status(200).json(comments);
  } catch (error) {
    console.error('Error fetching all comments:', error); // Log detailed error information
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};


exports.buyProduct = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    if (product.stock < quantity) return res.status(400).json({ message: 'Not enough stock' });

    product.stock -= quantity;
    await product.save();

    res.status(200).json({ message: 'Product purchased successfully', product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



exports.deleteComment = async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await Comment.findByIdAndDelete(id);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });
    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
