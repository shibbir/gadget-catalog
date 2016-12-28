let path = require('path'),
    mongoose = require('./mongoose'),
    config = require('../config');

module.exports.initMongo = callback => {
    mongoose.connect(function (db) {
        if (callback) callback(db);
    });
};

module.exports.start = () => {
    let _this = this;
    let app = require('./express')();

    _this.initMongo(function(db) {
        require('../../app/routes/index')(app);

        app.listen(app.get('port'), () => {
            console.info("Server running on port %s in %s mode...", app.get('port'), app.settings.env);
        });
    });
};
