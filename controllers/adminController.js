const User = require('../models/userModel');
const Product = require('../models/productModel');
const Comment = require('../models/commentModel');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getStats = async (req, res) => {
  try {
    const [userCount, farmerCount, buyerCount, productCount, almondCount, pistachioCount, commentCount] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ role: 'farmer' }),
      User.countDocuments({ role: 'buyer' }),
      Product.countDocuments(),
      Product.countDocuments({ title: 'almond' }),
      Product.countDocuments({ title: 'pistachio' }),
      Comment.countDocuments(),
    ]);

    const stats = {
      userCount,
      farmerCount,
      buyerCount,
      productCount,
      almondCount,
      pistachioCount,
      commentCount
    };

    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const user = await User.findByIdAndUpdate(id, updates, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
