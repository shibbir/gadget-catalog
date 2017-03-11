module.exports = process.env.NODE_ENV === 'production'
    ? require('./app/config/webpack.prod')
    : require('./app/config/webpack.dev');
