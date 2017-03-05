const config = require('../config');
const cloudinary = require('cloudinary');

module.exports = function() {
    cloudinary.config(config.cloudinary);

    return cloudinary;
};
