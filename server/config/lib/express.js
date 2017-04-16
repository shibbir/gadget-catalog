const config = require('../config');
const path = require('path');
const hbs = require('express-hbs');
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const compression = require('compression');

module.exports = function() {
    let app = express();

    app.locals.title = config.app.title;
    app.locals.description = config.app.description;

    app.locals.jsFiles = config.files.client.js;
    app.locals.cssFiles = config.files.client.css;

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.use(compression());

    app.use(express.static(path.join(process.cwd(), 'public')));

    app.engine('server.view.html', hbs.express4({ extname: '.server.view.html' }));
    app.set('view engine', 'server.view.html');
    app.set('views', path.join(process.cwd(), 'server/views'));

    app.use(multer({
        dest: './public/uploads/'
    }).array('files'));

    app.set('port', config.port);

    app.enable('trust proxy');

    return app;
};
