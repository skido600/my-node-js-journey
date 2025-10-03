const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("file type not supported,images only"), false);
  }
};
const fileSize = {
  limit: 1024 * 1024 * 10,
};
const upload = multer({ storage: storage, fileFilter, limits: fileSize });

module.exports = upload;
