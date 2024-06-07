const Product = require('../models/productModel');
const Comment = require('../models/commentModel'); // Import the Comment model

exports.createProduct = async (req, res) => {
  const { title, description, price, stock, category } = req.body;
  const image = req.file ? req.file.path : null;

  try {
    if (!title || !description || !price || !stock || !category || !image) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const product = await Product.create({ 
      title, 
      description, 
      price, 
      stock, 
      category, 
      image,
      farmer: req.user.id 
    });

    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error.stack);
    res.status(500).json({ message: error.message });
  }
};

exports.getFarmerProducts = async (req, res) => {
  try {
    const products = await Product.find({ farmer: req.user.id });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const product = await Product.findByIdAndUpdate(id, updates, { new: true });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(product);
  } catch (error) {
    console.error('Error updating product:', error.stack);
    res.status(500).json({ message: error.message });
  }
};

exports.getFarmerStats = async (req, res) => {
  try {
    const productCount = await Product.countDocuments({ farmer: req.user.id });
    const almondCount = await Product.countDocuments({ farmer: req.user.id, title: 'almond' });
    const pistachioCount = await Product.countDocuments({ farmer: req.user.id, title: 'pistachio' });
    const commentCount = await Comment.countDocuments({ farmer: req.user.id });

    res.status(200).json({
      productCount,
      almondCount,
      pistachioCount,
      commentCount
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stats', error });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error.stack);
    res.status(500).json({ message: error.message });
  }
};
