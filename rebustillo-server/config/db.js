const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });

    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    console.error("Server will continue running but database operations will fail.");
    console.error("Please check: 1) Your IP is whitelisted in MongoDB Atlas Network Access");
    console.error("              2) Your network/firewall allows DNS SRV lookups");
    console.error("              3) The Atlas cluster is active and not paused");
  }
};

module.exports = connectDB;
