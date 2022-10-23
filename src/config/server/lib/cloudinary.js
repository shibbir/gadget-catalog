const cloudinary = require("cloudinary");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

function uploadToCloudinary(file_path, options) {
    return new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload(file_path, options, (err, url) => {
            if (err) return reject(err);
            return resolve(url);
        });
    });
}

exports.uploadToCloudinary = uploadToCloudinary;
