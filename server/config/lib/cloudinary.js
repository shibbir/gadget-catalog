let config = require('../config');
let cloudinary = require('cloudinary');

module.exports = function() {
    cloudinary.config(config.cloudinary);

    return cloudinary;
};
