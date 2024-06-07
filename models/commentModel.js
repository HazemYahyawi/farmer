const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
}, { timestamps: true });

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
