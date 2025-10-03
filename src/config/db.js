const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

async function ConnectionDB() {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URL);
        console.log(`MongoDB Connected: ${connect.connection.host}`);
    } catch (error) {
        console.log("MongoDB Connection Error:", error.message);
        process.exit(1);
    }
}

module.exports = { ConnectionDB };
