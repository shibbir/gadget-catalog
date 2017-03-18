const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

let UserSchema = Schema({
    local: {
        email: {
            type: String,
            unique: true,
            match: [/.+\@.+\..+/]
        },
        password: String,
        name: String
    },
    facebook: {
        id: String,
        name: String,
        email: String,
        token: String
    },
    displayName: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: [ 'admin', 'basic' ],
        default: 'basic'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', UserSchema);
