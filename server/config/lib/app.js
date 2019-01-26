const path = require('path');
const mongoose = require('./mongoose');
const passport = require('passport');

module.exports.start = () => {
    require('dotenv').config();
    require('./passport')(passport);

    const app = require('./express')();

    mongoose.connect(function () {
        require(path.join(process.cwd(), 'server/core/core.routes'))(app);
        require(path.join(process.cwd(), 'server/user/user.routes'))(app, passport);
        require(path.join(process.cwd(), 'server/category/category.routes'))(app, passport);
        require(path.join(process.cwd(), 'server/brand/brand.routes'))(app, passport);
        require(path.join(process.cwd(), 'server/item/item.routes'))(app, passport);

        if(process.env.MONGO_SEED) {
            require('../seeder').run();
        }

        app.listen(app.get('port'), () => {
            console.info("Server running on port %s in %s mode...", app.get('port'), app.settings.env);
        });
    });
};
