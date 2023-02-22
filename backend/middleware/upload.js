const multer = require("multer");

const storage = multer.diskStorage({
  destination: function(request, file, callback) {
    callback(null, 'upload/');
  },
  filename: function(request, file, callback) {
    callback(null, Date.now().toString() + file.originalname);
  }
});

const fileFilter = (request, file, callback) => {
  //accept
  if (file.mimetype === "image/jpg" || file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    callback(null, true);
  } else {
    //reject
    callback(new Error("invalid mime type: " + file.mimetype),false);
  }
};

exports.upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});