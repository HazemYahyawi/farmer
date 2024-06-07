const express = require('express');
const fs = require('fs');
const { createProduct, updateProduct, deleteProduct, getFarmerProducts, getFarmerStats } = require('../controllers/farmerController'); // Ensure getFarmerStats is imported
const { protect } = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'uploads/';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post('/products', protect, upload.single('image'), createProduct);
router.put('/products/:id', protect, upload.single('image'), updateProduct);
router.delete('/products/:id', protect, deleteProduct);
router.get('/products', protect, getFarmerProducts);
router.get('/stats', protect, getFarmerStats); // Ensure this line is correct

module.exports = router;
