const path = require("path");
const config = require("../config");
const mongoose = require("./mongoose");

module.exports.start = () => {
    require("dotenv").config();

    mongoose.connect(function () {
        const app = require("./express")();

        config.server.strategies.forEach(function (strategy) {
            require(path.resolve(strategy))();
        });

        app.listen(app.get("port"), () => {
            console.info("Server running on port %s in %s mode...", app.get("port"), app.settings.env);
        });
    });
};
