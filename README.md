## :loudspeaker: Gadget Catalog
> A React application for cataloging gadgets

[![Build Status](https://travis-ci.org/shibbir/gadget-catalog.svg?branch=master)](https://travis-ci.org/shibbir/gadget-catalog)
[![Coverage Status](https://coveralls.io/repos/github/shibbir/gadget-catalog/badge.svg?branch=master)](https://coveralls.io/github/shibbir/gadget-catalog?branch=master)
[![Dependency Status](https://david-dm.org/shibbir/gadget-catalog.svg)](https://david-dm.org/shibbir/gadget-catalog)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](http://opensource.org/licenses/MIT)

## :hammer: Built with

- [Cloudinary](https://cloudinary.com/)
- [Draft.js](https://draftjs.org/)
- [Express](https://expressjs.com/)
- [Formik](https://jaredpalmer.com/formik/)
- [Highcharts](https://www.highcharts.com/)
- [Mocha](https://mochajs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Nodemailer](https://nodemailer.com/)
- [Passport](http://passportjs.org/)
- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [Semantic-UI-React](https://react.semantic-ui.com/)
- [Webpack](https://webpack.js.org/)

## :cloud: Cloudinary

This application requires [Cloudinary](https://cloudinary.com/), which is a Software-as-a-Service (SaaS) solution for managing media assets in the cloud. Just signup for a free account. After signing up you will find your configuration parameters in cloudinary management console.

## :rocket: Installation

> Step 1: Rename .env.example file to .env and configure the environment variables.

```bash
NODE_ENV=development or production

BASE_URL=server_base_url
MONGODB_URI=mongodb_connection_url

GOOGLE_CLIENT_ID=google_client_id
GOOGLE_CLIENT_SECRET=google_client_secret

FACEBOOK_CLIENT_ID=facebook_client_id
FACEBOOK_CLIENT_SECRET=facebook_client_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

TOKEN_SECRET=application_secret_token

SMTP_HOST=smtp_server_name
MAILER_ADDRESS=mailer_email_address
MAILER_PASSWORD=mailer_email_password

```

> Step 2: Install dependencies and bootstrap the application.

You need to have [Node.js](https://nodejs.org/en/) and optionally [Yarn](https://yarnpkg.com/lang/en/) installed on your machine before running the followings:

```bash
$ cd /path/to/root
$ yarn install
## or,
$ npm install

## development build
$ npm start

## production build
$ npm run production
```

## :white_check_mark: Unit Test

```bash
$ cd /path/to/root

## run unit tests
$ npm test

## generate coverage report
$ npm run coverage
```

## :key: License
<a href="https://opensource.org/licenses/MIT">The MIT License</a> Copyright &copy; 2020 Shibbir Ahmed
