const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RequestSchema = new Schema({
    buyerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    products: [
        {
            productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, required: true },
            farmerId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
        }
    ],
    status: { type: String, default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Request', RequestSchema);
