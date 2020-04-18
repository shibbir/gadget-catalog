const path = require("path");
const passport = require("passport");
const cache = require("memory-cache");
const mongoose = require("./mongoose");
const User = require("../../user/user.model");

module.exports.start = () => {
    require("dotenv").config();
    require("./passport")(passport);

    const app = require("./express")();

    mongoose.connect(function () {
        if(process.env.SEED_DB) {
            require("../seeder").run();
        }

        User.findOne({ role: "admin" }, function(err, doc) {
            if(doc) {
                cache.put("adminId", doc._id);
            }
        });

        require(path.join(process.cwd(), "server/user/user.routes"))(app, passport);
        require(path.join(process.cwd(), "server/category/category.routes"))(app, passport);
        require(path.join(process.cwd(), "server/brand/brand.routes"))(app, passport);
        require(path.join(process.cwd(), "server/item/item.routes"))(app, passport);
        require(path.join(process.cwd(), "server/core/core.routes"))(app);

        app.listen(app.get("port"), () => {
            console.info("Server running on port %s in %s mode...", app.get("port"), app.settings.env);
        });
    });
};
