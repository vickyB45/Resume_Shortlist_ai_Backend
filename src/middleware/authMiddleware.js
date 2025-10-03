const jwt = require("jsonwebtoken");
const { User } = require("../models/userModel.js");

// Protect Middleware (Only for logged-in users)
const protect = async (req, res, next) => {
  try {
    // 1. Cookie se token uthao
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    // 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. User DB me find karo aur password exclude karo
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ User authorized hai → next()
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    res.status(401).json({ message: "Not authorized, token invalid" });
  }
};

// CommonJS export
module.exports = { protect };
