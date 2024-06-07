const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  getProducts,
  getProduct,
  addComment,
  getComments,
  getAllComments,
  deleteComment,
  buyProduct,
} = require('../controllers/productController');

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/comments/:id', protect, addComment);
router.get('/comments/:id', getComments);
router.get('/comments/all', getAllComments); // Ensure this route is correctly defined
router.delete('/comments/:id', protect, deleteComment);
router.post('/buy/:id', protect, buyProduct);

module.exports = router;
