const _ = require('lodash');
const path = require('path');
const _root = path.resolve(__dirname, '../..');

function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [_root].concat(args));
}

function getRequestObject(options) {
    return _.merge({
        method: 'post'
    }, options);
}

function getBearerRequestObject(options) {
    const token = localStorage.getItem('jwtToken');

    if(!token || typeof token === 'undefined') return null;

    return _.merge({
        method: 'post',
        headers: {
            Authorization: `Bearer ${token}`
        }
    }, options);
}

exports.root = root;
exports.getRequestObject = getRequestObject;
exports.getBearerRequestObject = getBearerRequestObject;
