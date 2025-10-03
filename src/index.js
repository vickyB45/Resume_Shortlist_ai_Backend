// Import dependencies
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { ConnectionDB } = require("./config/db.js");
const userRoute = require("./routes/userRoute.js");
const resumeRoutes = require("./routes/resumeUploadRoute.js");

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(express.json()); 
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(cookieParser());

// Connect to Database
ConnectionDB();

// Default Route - Health Check
app.get("/", (req, res) => {
    res.send("✅ Server is Running...");
});

// Auth Routes
app.use("/api/auth", userRoute);


//User history
app.use("/api/resume",resumeRoutes)

// Define PORT
const PORT = process.env.PORT || 8080;

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server started at http://localhost:${PORT}`);
});
