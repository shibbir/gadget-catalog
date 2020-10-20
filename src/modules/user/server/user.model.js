const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const UserSchema = Schema({
    local: {
        email: {
            type: String,
            match: [/.+\@.+\..+/]
        },
        password: {
            type: String,
            minlength: 8,
            maxlength: 60
        },
        name: {
            type: String,
            minlength: 2,
            maxlength: 25,
            required() { return !this.facebook && !this.google; }
        },
        refresh_token: {
            type: String,
            required() { return !this.facebook && !this.google; }
        },
        resetPasswordToken: String,
        resetPasswordExpires: Date
    },
    facebook: {
        id: String,
        name: String,
        email: String,
        accessToken: String
    },
    google: {
        id: String,
        name: String,
        email: String,
        accessToken: String
    },
    displayName: {
        type: String,
        minlength: 2,
        maxlength: 25,
        required: true
    },
    role: {
        type: String,
        enum: ["admin", "basic"],
        default: "basic"
    },
    date: {
        type: Date,
        default: Date.now
    }
});

UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, 8);
};

UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model("User", UserSchema);
