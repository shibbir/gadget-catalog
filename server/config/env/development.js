let defaultEnvConfig = require('./default');

module.exports = {
    app: {
        title: defaultEnvConfig.app.title + ' - Development Environment'
    },
    db: {
        uri: process.env.MONGOHQ_URL || process.env.MONGODB_URI || 'mongodb://' + (process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost') + '/gadget-catalog-dev',
    },
    tokenSecret: 'a17dd903-6ffa-46d4-901a-3d34b55fce2b'
};
