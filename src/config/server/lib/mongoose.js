const mongoose = require("mongoose");

module.exports.connect = function(callback) {
    mongoose.Promise = global.Promise;
    mongoose.set("strictQuery", true);

    mongoose.connect(process.env.MONGODB_URI).then(function() {
        if(callback) callback();
    }).catch(function(err) {
        console.info("Could not connect to MongoDB!");
        console.error(err);
    });
};
