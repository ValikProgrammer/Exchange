require('dotenv').config();
const app = require('./app');
const http = require('http');
const socketIo = require('socket.io');
const config = require('config');
const logger = require('./utils/logger');
const { initWebSocket } = require('./utils/websocket');
const { connectDB } = require('./config/db');
const { initRateService } = require('./services/rateService');
const { initTransactionMonitor } = require('./services/transactionMonitor');

const PORT = process.env.PORT || 5000;

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const io = socketIo(server, {
  cors: {
    origin: config.get('corsOrigin'),
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Connect to MongoDB
connectDB();

// Initialize WebSocket for real-time updates
initWebSocket(io);

// Initialize rate service for cryptocurrency rates
initRateService();

// Initialize transaction monitor to watch for incoming transactions
initTransactionMonitor();

// Start the server
server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error('Unhandled Rejection:', err);
  // Close server & exit process
  server.close(() => process.exit(1));
});