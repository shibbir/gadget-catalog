const multer  = require("multer");

module.exports = multer({
    dest: "public/uploads/",
    limits: {
        fileSize: 1500000
    }
});
