const path = require('path');
const mongoose = require('./mongoose');
const config = require('../config');
const passport = require('passport');

module.exports.initMongo = callback => {
    mongoose.connect(function (db) {
        if (callback) callback(db);
    });
};

module.exports.start = () => {
    const app = require('./express')();

    require('./passport')(passport);

    this.initMongo(function(db) {
        require(path.join(process.cwd(), 'server/routes/index.routes'))(app);
        require(path.join(process.cwd(), 'server/routes/account.routes'))(app, passport);
        require(path.join(process.cwd(), 'server/routes/category.routes'))(app, passport);
        require(path.join(process.cwd(), 'server/routes/brand.routes'))(app, passport);
        require(path.join(process.cwd(), 'server/routes/item.routes'))(app, passport);

        require('../seeder').run();

        app.listen(app.get('port'), () => {
            console.info("Server running on port %s in %s mode...", app.get('port'), app.settings.env);
        });
    });
};
