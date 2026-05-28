import multer from "multer";
import path from "path";


// Storage Config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/uploads/");
  },

  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(
      null,
      uniqueSuffix + path.extname(file.originalname)
    );
  },
});


// File Filter
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = [
    "application/pdf",
    "image/png",
    "image/jpg",
    "image/jpeg",
  ];

  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Only PDF, PNG, JPG and JPEG files are allowed"
      ),
      false
    );
  }
};


// Upload Middleware
const upload = multer({
  storage,
  fileFilter,

  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

export default upload;