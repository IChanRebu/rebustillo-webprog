const mongoose = require('mongoose');
const dns = require('dns');

// Try to connect with retries and don't hard-exit the process on failure.
const connectWithRetry = async (uri, attempts = 5, delay = 2000) => {
  for (let i = 0; i < attempts; i++) {
    try {
      const conn = await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 15000,
      });
      return conn;
    } catch (err) {
      const next = i + 1;
      console.error(`MongoDB connect attempt ${next} failed: ${err.message}`);
      if (next < attempts) {
        await new Promise((res) => setTimeout(res, delay));
        delay *= 2;
        continue;
      }
      return null;
    }
  }
  return null;
};

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
  if (!uri) {
    console.error('MongoDB connection string is required in MONGODB_URI or MONGO_URI');
    return null;
  }

  // Prefer reliable public DNS for SRV lookups when available
  try {
    dns.setServers(['8.8.8.8', '1.1.1.1']);
  } catch (e) {
    // ignore if setting DNS servers is not allowed in the environment
  }

  const conn = await connectWithRetry(uri, 5, 2000);
  if (conn) {
    console.log(`MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
    return conn;
  }

  console.error('MongoDB connection failed after retries. App will continue but DB operations may fail.');
  return null;
};

module.exports = connectDB;