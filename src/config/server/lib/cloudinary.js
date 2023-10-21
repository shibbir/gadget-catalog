const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

async function upload(asset_path, options) {
    return await cloudinary.uploader.upload(asset_path, options);
}

async function destroy(public_id, options) {
    await cloudinary.uploader.destroy(public_id, options);
}

async function deleteResources(public_ids) {
    await cloudinary.api.delete_resources(public_ids);
}

async function deleteFolder(folder_path) {
    await cloudinary.api.delete_folder(folder_path);
}

exports.upload = upload;
exports.destroy = destroy;
exports.deleteResources = deleteResources;
exports.deleteFolder = deleteFolder;
