const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    let uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/rebustillo';

    const isPlaceholderUri = uri.includes('<user>') || uri.includes('<password>') || uri.includes('your_mongo');
    if (isPlaceholderUri) {
      console.warn('MongoDB URI is a placeholder. Falling back to local MongoDB.');
      uri = 'mongodb://127.0.0.1:27017/rebustillo';
    }

    const conn = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    console.warn('MongoDB connection failed. Server will continue running. Some features may not work.');
    // Don't exit - allow server to continue running even if DB is down
  }
};

module.exports = connectDB;