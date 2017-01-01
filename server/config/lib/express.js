let config = require('../config');
let path = require('path');
let hbs = require('express-hbs');
let express = require('express');
let bodyParser = require('body-parser');

module.exports = () => {
    let app = express();

    app.locals.title = config.app.title;
    app.locals.description = config.app.description;

    app.locals.jsFiles = config.files.client.js;
    app.locals.cssFiles = config.files.client.css;

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.use(express.static(path.join(process.cwd(), 'public')));

    app.engine('server.view.html', hbs.express4({ extname: '.server.view.html' }));
    app.set('view engine', 'server.view.html');
    app.set('views', path.join(process.cwd(), 'server/views'));

    app.set('port', config.port);

    return app;
};
