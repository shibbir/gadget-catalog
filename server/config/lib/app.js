let path = require('path');
let mongoose = require('./mongoose');
let config = require('../config');
let passport = require('passport');

module.exports.initMongo = callback => {
    mongoose.connect(function (db) {
        if (callback) callback(db);
    });
};

module.exports.start = () => {
    let _this = this;
    let app = require('./express')();

    require('./passport')(passport);

    _this.initMongo(function(db) {
        require(path.join(process.cwd(), 'server/routes/index/'))(app);
        require(path.join(process.cwd(), 'server/routes/user/'))(app, passport);

        app.listen(app.get('port'), () => {
            console.info("Server running on port %s in %s mode...", app.get('port'), app.settings.env);
        });
    });
};
