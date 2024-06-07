const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const farmerRoutes = require('./routes/farmerRoutes');
const productRoutes = require('./routes/productRoutes');
const adminRoutes = require('./routes/adminRoutes');
const requestsRoute = require('./routes/requestsRoute');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const mongoURI = process.env.MONGODB_URI;
if (!mongoURI) {
  console.error('MONGODB_URI is not defined in the environment variables');
  process.exit(1);
}

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch((error) => {
  console.log(error);
});
app.use('/api/requests', requestsRoute);
app.use('/api/auth', authRoutes);
app.use('/api/farmer', farmerRoutes);
app.use('/api/products', productRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
