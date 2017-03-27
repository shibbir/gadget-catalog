const defaultEnvConfig = require('./default');

module.exports = {
    app: {
        title: defaultEnvConfig.app.title
    },
    db: {
        uri: process.env.MONGOHQ_URL || process.env.MONGODB_URI || 'mongodb://' + (process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost') + '/gadget-catalog'
    },
    cloudinary: {
        cloud_name: process.env.CLOUDINARY_NAME || 'your_cloudinary_name',
        api_key: process.env.CLOUDINARY_API_KEY || 'your_cloudinary_api_key',
        api_secret: process.env.CLOUDINARY_API_SECRET || 'your_cloudinary_api_secret'
    },
    oauth: {
        facebook: {
            clientID: process.env.FACEBOOK_CLIENT_ID || 'client_id',
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET || 'client_secret',
            callbackURL: process.env.FACEBOOK_CALLBACK_URL || 'callback_url',
            profileFields: ['id', 'displayName', 'email']
        },
        google: {
            clientID: process.env.GOOGLE_CLIENT_ID || 'client_id',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'client_secret',
            callbackURL: process.env.GOOGLE_CALLBACK_URL || 'callback_url'
        }
    }
};
