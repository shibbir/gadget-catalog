const _ = require('lodash');

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

exports.getRequestObject = getRequestObject;
exports.getBearerRequestObject = getBearerRequestObject;
