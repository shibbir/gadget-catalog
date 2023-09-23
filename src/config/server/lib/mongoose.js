const mongoose = require("mongoose");

module.exports.connect = function(callback) {
    mongoose.Promise = global.Promise;
    mongoose.set("strictQuery", true);

    const db = mongoose.connect(process.env.MONGODB_URI).then(function() {
        if(callback) callback(db);
    }).catch(function(err) {
        console.info("Could not connect to MongoDB!");
        console.error(err);
    });
};
