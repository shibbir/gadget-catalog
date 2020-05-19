const mongoose = require("mongoose");

module.exports.connect = function(callback) {
    mongoose.Promise = global.Promise;

    const db = mongoose.connect(process.env.MONGODB_URI, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    }).then(function() {
        if(callback) callback(db);
    }).catch(function(err) {
        console.error("Could not connect to MongoDB!");
        console.log(err);
    });
};
