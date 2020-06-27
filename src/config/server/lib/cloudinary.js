const cloudinary = require("cloudinary");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

async function uploadAsync(file, folder) {
    const { createReadStream } = await file;
    const fileStream = createReadStream();

    return new Promise((resolve, reject) => {
        const cloudStream = cloudinary.v2.uploader.upload_stream({ folder }, function (error, response) {
            if(error) reject(error);
            resolve(response);
        });

        fileStream.pipe(cloudStream);
    });
}

async function destroyAsync(public_id) {
    return new Promise((resolve, reject) => {
        cloudinary.v2.uploader.destroy(public_id, { invalidate: true }, function (error, result) {
            if(error) reject(error);
            resolve(result);
        });
    });
}

exports.cloudinary = cloudinary;
exports.uploadAsync = uploadAsync;
exports.destroyAsync = destroyAsync;
