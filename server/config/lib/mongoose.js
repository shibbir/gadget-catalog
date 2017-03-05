const config = require('../config');
const chalk = require('chalk');
const path = require('path');
const mongoose = require('mongoose');

module.exports.connect = function(callback) {
    let _this = this;

    let db = mongoose.connect(config.db.uri, function (err) {
        if (err) {
            console.error(chalk.red('Could not connect to MongoDB!'));
            console.log(err);
        } else {
            mongoose.Promise = config.db.promise;

            if (callback) callback(db);
        }
    });
};

module.exports.disconnect = callback => {
    mongoose.disconnect(function (err) {
        console.info(chalk.yellow('Disconnected from MongoDB.'));
        callback(err);
    });
};
