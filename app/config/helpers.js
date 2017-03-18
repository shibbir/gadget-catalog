const _ = require('lodash');
const path = require('path');
const _root = path.resolve(__dirname, '../..');

function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [_root].concat(args));
}

function getAxiosRequestObject(options) {
    return _.merge({
        method: 'get',
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('jwtToken')
        }
    }, options);
}

exports.root = root;
exports.getAxiosRequestObject = getAxiosRequestObject;
