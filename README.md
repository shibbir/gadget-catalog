## Gadget-Catalog
> A React application for cataloging gadgets

[![Build Status](https://travis-ci.org/shibbir/gadget-catalog.svg?branch=master)](https://travis-ci.org/shibbir/gadget-catalog)
[![Coverage Status](https://coveralls.io/repos/github/shibbir/gadget-catalog/badge.svg?branch=master)](https://coveralls.io/github/shibbir/gadget-catalog?branch=master)
[![Dependency Status](https://david-dm.org/shibbir/gadget-catalog.svg)](https://david-dm.org/shibbir/gadget-catalog)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](http://opensource.org/licenses/MIT)

Built with:

- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [Formik](https://jaredpalmer.com/formik/)
- [Draft.js](https://draftjs.org/)
- [Semantic-UI-React](https://react.semantic-ui.com/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Cloudinary](https://cloudinary.com/)
- [Passport](http://passportjs.org/)
- [Webpack](https://webpack.js.org/)
- [Jasmine](https://jasmine.github.io/)

## Cloudinary

> This application requires [Cloudinary](https://cloudinary.com/), which is a Software-as-a-Service (SaaS) solution for managing media assets in the cloud. Just signup for a free account. After signing up you will find your configuration parameters in the cloudinary management console.

## Configure environment variables

> Rename .env.sample file to .env and configure the environment variables.

```bash
NODE_ENV=development or production

MONGODB_URI=mongodb_connection_url

GOOGLE_CLIENT_ID=google_client_id
GOOGLE_CLIENT_SECRET=google_client_secret

FACEBOOK_CLIENT_ID=facebook_client_id
FACEBOOK_CLIENT_SECRET=facebook_client_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

TOKEN_SECRET=application_secret_token

```

## Installation

You need to have latest version of [Node.js](https://nodejs.org/en/) installed on your machine before running the followings:

```bash
$ cd /path/to/root
$ npm install

or if you want to use yarn
$ yarn install

## for development preview
$ npm start

## for production preview
$ npm run production
```

## Running Unit Tests

```bash
$ cd /path/to/root
$ npm test
```

## Code Coverage

```bash
$ cd /path/to/root
$ npm run coverage
```

## License
<a href="https://opensource.org/licenses/MIT">The MIT License</a> Copyright &copy; 2019 Shibbir Ahmed
