const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const config = require('config');
const { errorHandler } = require('./middleware/error');
const authRoutes = require('./routes/auth');
const exchangeRoutes = require('./routes/exchange');
const rateRoutes = require('./routes/rate');
const walletRoutes = require('./routes/wallet');
const settingsRoutes = require('./routes/settings');

const app = express();

// Middleware
app.use(cors({
  origin: config.get('corsOrigin'),
  credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/exchanges', exchangeRoutes);
app.use('/api/rates', rateRoutes);
app.use('/api/wallets', walletRoutes);
app.use('/api/settings', settingsRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Error handling middleware
app.use(errorHandler);

module.exports = app;