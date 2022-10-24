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

function destroyFromCloudinary(public_id, options) {
    return new Promise((resolve, reject) => {
        cloudinary.v2.uploader.destroy(public_id, options, (err) => {
            if (err) return reject(err);
            return resolve();
        });
    });
}

function deleteResourcesFromCloudinary(public_ids) {
    return new Promise((resolve, reject) => {
        cloudinary.v2.api.delete_resources(public_ids, (err) => {
            if (err) return reject(err);
            return resolve();
        });
    });
}

function deleteFolderFromCloudinary(folder_path) {
    return new Promise((resolve, reject) => {
        cloudinary.v2.api.delete_folder(folder_path, (err) => {
            if (err) return reject(err);
            return resolve();
        });
    });
}

exports.uploadToCloudinary = uploadToCloudinary;
exports.destroyFromCloudinary = destroyFromCloudinary;
exports.deleteResourcesFromCloudinary = deleteResourcesFromCloudinary;
exports.deleteFolderFromCloudinary = deleteFolderFromCloudinary;
