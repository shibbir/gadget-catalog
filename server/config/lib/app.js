const path = require('path');
const mongoose = require('./mongoose');
const config = require('../config');
const cloudinary = require('./cloudinary')();

const passport = require('passport');

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
        require(path.join(process.cwd(), 'server/routes/category/'))(app, passport);
        require(path.join(process.cwd(), 'server/routes/brand/'))(app, passport);
        require(path.join(process.cwd(), 'server/routes/item/'))(app, passport, cloudinary);

        require('../seeder').run();

        app.listen(app.get('port'), () => {
            console.info("Server running on port %s in %s mode...", app.get('port'), app.settings.env);
        });
    });
};
