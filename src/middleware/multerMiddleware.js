const multer = require("multer");
const path = require("path");

const uploadPath = path.join(process.cwd(), "src", "uploads");

// DiskStorage ensures req.file.buffer is available
const storage = multer.diskStorage({
  destination: (req, file, cd) => cd(null, uploadPath),
  filename: (req, file, cd) => cd(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB max
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files are allowed"), false);
    }
    cb(null, true);
  }
});

// CommonJS export
module.exports = { upload };
