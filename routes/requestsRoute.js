const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');

router.post('/send', requestController.sendRequest);
router.get('/farmer/:farmerId', requestController.getRequests);

module.exports = router;
