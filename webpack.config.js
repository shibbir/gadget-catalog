if(process.env.NODE_ENV === 'production') {
    module.exports = require('./app/config/webpack.prod');
} else {
    module.exports = require('./app/config/webpack.dev');
}
