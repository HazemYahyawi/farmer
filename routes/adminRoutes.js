const express = require('express');
const { getUsers, updateUser, deleteUser,getStats } = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/users', protect, admin, getUsers);
router.put('/users/:id', protect, admin, updateUser);
router.delete('/users/:id', protect, admin, deleteUser); 
router.get('/stats', protect, getStats);


module.exports = router;
