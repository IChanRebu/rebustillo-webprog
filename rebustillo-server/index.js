require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const userRoutes = require('./routes/useRoutes');

const app = express();

const allowedOrigins = [
  process.env.FRONTEND_URL || 'https://rebustillo-webprog.vercel.app',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:4173',
  'http://127.0.0.1:4173',
  'http://localhost:8000',
  'http://127.0.0.1:8000',
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    if (process.env.NODE_ENV !== 'production' && /^(https?:\/\/)(localhost|127\.0\.0\.1|\d+\.\d+\.\d+\.\d+)(:\d+)?$/.test(origin)) {
      return callback(null, true);
    }

    callback(new Error(`CORS policy blocked origin: ${origin}`));
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json());

// Middleware
app.use(jsonParser);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/users', userRoutes);

// Root route handler
app.get('/', (req, res) => {
  res.json({ message: 'Rebustillo API Server is running' });
});

// Health-check endpoint
app.get('/health', (req, res) => {
  const state = mongoose.connection && mongoose.connection.readyState;
  // 1 = connected, 0 = disconnected
  const dbStatus = state === 1 ? 'connected' : 'disconnected';
  res.json({ status: 'ok', db: dbStatus });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server Error' });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  const conn = await connectDB();
  if (!conn) {
    console.warn('DB not connected. Starting server anyway — DB operations may fail.');
  }

  if (require.main === module) {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  }
};

startServer();

module.exports = app;
