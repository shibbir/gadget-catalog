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

## :key: Configuring environment variables

> Rename .env.example file to .env and adjust your environment variables. Details for each environment variables are below:

`NODE_ENV` In what mode you want to run this application. For example *development*, *production*, or *test*

`PORT` On which port express server will be running to. If you don't specify a port then **4040** will be used.

`BASE_URL` Applications base or root url. For example, if you didn't specify a port via `PORT` environment variable then your base url would be *http://localhost:4040*

`MONGODB_URI` MongoDB connection string URI. For more details visit [here](https://docs.mongodb.com/manual/reference/connection-string/).

`TOKEN_SECRET` JWT secret key. Learn more from [here](https://jwt.io/introduction/).

`GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` These are you OAuth 2.0 client credentials from google which you will need to configure OAuth 2.0. Learn more from [here](https://developers.google.com/identity/protocols/OAuth2).

`FACEBOOK_CLIENT_ID` and `FACEBOOK_CLIENT_SECRET` These are you OAuth 2.0 client credentials from facebook which you will need to configure OAuth 2.0. Learn more from [here](https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow).

`CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET` After signing up for a free account in [Cloudinary](https://cloudinary.com/), go to your [dashboard](https://cloudinary.com/console) to obtain the required credentials to access their api. Learn more from [here](https://cloudinary.com/documentation).

`SMTP_HOST`, `MAILER_ADDRESS`, and `MAILER_PASSWORD` Your mail server's smtp address and your email credentials. Learn more from [here](https://nodemailer.com/smtp/). If you want to use gmail to send emails you have to allow non secure apps to access gmail. you can do this by going to your gmail settings [here](https://myaccount.google.com/lesssecureapps).

## :rocket: Installation and bootstrapping

> You need to have [Node.js](https://nodejs.org/en/) and optionally [Yarn](https://yarnpkg.com/lang/en/) installed on your machine before running the followings:

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

## :heavy_check_mark: Unit Test

```bash
$ cd /path/to/root

## run unit tests
$ npm test

## generate coverage report
$ npm run coverage
```

## :memo: License
<a href="https://opensource.org/licenses/MIT">The MIT License</a> Copyright &copy; 2020 Shibbir Ahmed
