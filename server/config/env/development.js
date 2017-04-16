const defaultEnvConfig = require('./default');

module.exports = {
    app: {
        title: `${defaultEnvConfig.app.title} - Development Environment`
    },
    tokenSecret: process.env.TOKEN_SECRET || 'application_secret_token',
    db: {
        seedDB: process.env.SEED_DB || false,
        uri: process.env.MONGOHQ_URL || process.env.MONGODB_URI || 'mongodb://' + (process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost') + '/gadget-catalog-dev',
    },
    cloudinary: {
        cloud_name: process.env.CLOUDINARY_NAME || 'your_cloudinary_name',
        api_key: process.env.CLOUDINARY_API_KEY || 'your_cloudinary_api_key',
        api_secret: process.env.CLOUDINARY_API_SECRET || 'your_cloudinary_api_secret'
    },
    oauth: {
        facebook: {
            clientID: process.env.FACEBOOK_CLIENT_ID || 'facebook_client_id',
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET || 'facebook_client_secret',
            callbackURL: '/auth/facebook/callback'
        },
        google: {
            clientID: process.env.GOOGLE_CLIENT_ID || 'google_client_id',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'google_client_secret',
            callbackURL: '/auth/google/callback'
        }
    }
};
