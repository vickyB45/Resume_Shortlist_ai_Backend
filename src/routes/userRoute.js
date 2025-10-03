const express = require("express");
const {
  handleGetMe,
  handleLogout,
  handleUserLogin,
  handleUserRegister
} = require("../controllers/userControllers.js");
const { protect } = require("../middleware/authMiddleware.js");

const route = express.Router();

route.post("/register", handleUserRegister);
route.post("/login", handleUserLogin);
route.post("/logout", handleLogout);
route.get("/me", protect, handleGetMe);

// CommonJS export
module.exports = route;
