require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const connectDB = require('./config/db');
const userRoutes = require('./routes/useRoutes');
// const articleRoutes = require('./routes/articleRoutes');

const app = express();

// Database Connection
connectDB();

const allowedOrigins = [
  process.env.FRONTEND_URL || 'https://rebustillo-webprog.vercel.app',
  'http://localhost:5173',
  'http://localhost:8000',
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());

// Middleware
app.use(jsonParser);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/users', userRoutes);
// app.use('/api/articles', articleRoutes);

// Root route handler
app.get('/', (req, res) => {
  res.json({ message: 'Rebustillo API Server is running' });
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

if (require.main === module) {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
