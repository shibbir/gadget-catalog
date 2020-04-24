const path = require("path");
const passport = require("passport");
const mongoose = require("./mongoose");

module.exports.start = () => {
    require("dotenv").config();
    require("./passport")(passport);

    const app = require("./express")();

    mongoose.connect(function () {
        require(path.join(process.cwd(), "modules/user/server/user.routes"))(app, passport);
        require(path.join(process.cwd(), "modules/category/server/category.routes"))(app, passport);
        require(path.join(process.cwd(), "modules/brand/server/brand.routes"))(app, passport);
        require(path.join(process.cwd(), "modules/item/server/item.routes"))(app, passport);
        require(path.join(process.cwd(), "modules/core/server/core.routes"))(app);

        app.listen(app.get("port"), () => {
            console.info("Server running on port %s in %s mode...", app.get("port"), app.settings.env);
        });
    });
};
