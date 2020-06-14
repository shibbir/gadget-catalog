const mongoose = require("./mongoose");

module.exports.start = () => {
    require("dotenv").config();

    mongoose.connect(function () {
        const app = require("./express")();

        app.listen(app.get("port"), () => {
            console.info(`Server running on port ${app.get("port")} in ${app.settings.env} mode...`);
        });
    });
};
