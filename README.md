## Gadget-Catalog
> A React application for cataloging gadgets

[![Build Status](https://travis-ci.org/shibbir/gadget-catalog.svg?branch=master)](https://travis-ci.org/shibbir/gadget-catalog)
[![Dependency Status](https://david-dm.org/shibbir/gadget-catalog.svg)](https://david-dm.org/shibbir/gadget-catalog)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](http://opensource.org/licenses/MIT)

Built with:

- [React](https://facebook.github.io/react/)
- [Draft.js](https://facebook.github.io/draft-js/)
- [Redux](http://redux.js.org/)
- [Redux Form](http://redux-form.com)
- [Semantic-UI-React](http://react.semantic-ui.com)
- [Express](http://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Cloudinary](http://cloudinary.com/documentation/solution_overview)
- [Passport](http://passportjs.org/)
- [Webpack](https://webpack.github.io/)

## Setup Cloudinary

> This application requires [Cloudinary](http://cloudinary.com/documentation/solution_overview), which is a Software-as-a-Service (SaaS) solution for managing media assets in the cloud.

Edit the environment files to configure Cloudinary. You can find your configuration parameters in the cloudinary Management Console.

- For development: */server/config/env/development.js*
- For production: */server/config/env/production.js*

```bash
cloudinary: {
    cloud_name: 'your_cloudinary_name',
    api_key: 'your_cloudinary_api_key',
    api_secret: 'your_cloudinary_api_secret'
}
```

## Setup OAuth

Edit the environment files to configure OAuth.

- For development: */server/config/env/development.js*
- For production: */server/config/env/production.js*

```bash
oauth: {
    facebook: {
        clientID: 'client_id',
        clientSecret: 'client_secret',
        callbackURL: 'callback_url',
        profileFields: ['id', 'displayName', 'email']
    },
    google: {
        clientID: 'client_id',
        clientSecret: 'client_secret',
        callbackURL: 'callback_url',
    }
}
```

## Installation

You need to have latest version of [Node.js](https://nodejs.org/en/) installed on your machine before running the followings:

```bash
$ cd /path/to/root
$ npm install
$ npm start
```

## License
<a href="https://opensource.org/licenses/MIT">The MIT License</a> Copyright &copy; 2017 Shibbir Ahmed
