const express = require('express');
const { registerAdmin, register, login, logout } = require('../controllers/authController');
const router = express.Router();

router.post('/RegisterA', registerAdmin);
router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);

module.exports = router;
