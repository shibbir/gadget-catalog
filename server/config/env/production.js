module.exports = {
    db: {
        uri: process.env.MONGOHQ_URL || process.env.MONGODB_URI || 'mongodb://' + (process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost') + '/gadget-catalog',
    },
    cloudinary: {
        cloud_name: 'your_cloudinary_name',
        api_key: 'your_cloudinary_api_key',
        api_secret: 'your_cloudinary_api_secret'
    }
};
