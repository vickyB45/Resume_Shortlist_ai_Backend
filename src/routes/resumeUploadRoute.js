const express = require("express");
const { protect } = require("../middleware/authMiddleware.js");
const { upload } = require("../middleware/multerMiddleware.js");
const { uploadResume, useGetHistory } = require("../controllers/resumeUploadControllers.js");


const router = express.Router();

router.post("/upload", protect, upload.single("resume"), uploadResume);

// history
router.get("/history/:userId",protect,useGetHistory)

module.exports = router;
