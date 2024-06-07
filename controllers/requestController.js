const Request = require('../models/requestModel'); // Assume you have a Request model
const Product = require('../models/productModel'); // Assume you have a Product model

// Send request
exports.sendRequest = async (req, res) => {
    const { buyerId, products } = req.body;

    console.log('Received Data:', req.body);

    if (!buyerId || !products || !Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ error: 'Invalid request data' });
    }

    try {
        const request = new Request({
            buyerId,
            products,
            status: 'pending'
        });

        await request.save();
        res.status(201).json({ message: 'Request sent successfully', request });
    } catch (error) {
        console.error('Error sending request:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getRequests = async (req, res) => {
    const { farmerId } = req.params;

    try {
        const requests = await Request.find({ 'products.farmerId': farmerId });
        res.status(200).json(requests);
    } catch (error) {
        console.error('Error fetching requests:', error);
        res.status(500).json({ error: 'Server error' });
    }
};