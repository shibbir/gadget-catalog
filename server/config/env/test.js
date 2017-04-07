const _ = require('lodash');
const developmentConfig = require('./development');

module.exports = _.merge(developmentConfig, {
    tokenSecret: process.env.TOKEN_SECRET || 'xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx',
    db: {
        uri: process.env.MONGOHQ_URL || process.env.MONGODB_URI || 'mongodb://' + (process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost') + '/gadget-catalog-test',
    }
});
