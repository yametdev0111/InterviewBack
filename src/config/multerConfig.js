const multer = require("multer");
const fs = require("fs");
const dontenv = require("dotenv");
dontenv.config({ path: ".env" });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    var directory = '/upload';
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }
    cb(null, directory);
  },
  filename: function (req, file, cb) {
    cb(
      null,
        Date.now() +
        "-" +
        file.originalname + 
        (file.originalname.indexOf('.') != -1 ? '' : '.jpg')
    );
  },
});

const upload = multer({ storage: storage })

module.exports = { upload };
