const mongoose = require('mongoose');
const dns = require('dns');

// Override local DNS to fix querySrv ECONNREFUSED error in Node.js
if (!process.env.VERCEL) {
    dns.setServers(['8.8.8.8', '8.8.4.4']);
}

const connectDB = async () => {
    // Connect MongoDB at default port 27017.
    console.log("=== DB CONNECTION ATTEMPTING... ===");
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            // Options
        });
        console.log(`=== DB SUCCESS: ${conn.connection.host} ===`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;