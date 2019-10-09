## :loudspeaker: Gadget Catalog
> A React application for cataloging gadgets

[![Build Status](https://travis-ci.org/shibbir/gadget-catalog.svg?branch=master)](https://travis-ci.org/shibbir/gadget-catalog)
[![Coverage Status](https://coveralls.io/repos/github/shibbir/gadget-catalog/badge.svg?branch=master)](https://coveralls.io/github/shibbir/gadget-catalog?branch=master)
[![Dependency Status](https://david-dm.org/shibbir/gadget-catalog.svg)](https://david-dm.org/shibbir/gadget-catalog)
[![DeepScan grade](https://deepscan.io/api/teams/5649/projects/7486/branches/76909/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=5649&pid=7486&bid=76909)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](http://opensource.org/licenses/MIT)

## :hammer: Built with

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
- [Mocha](https://mochajs.org/)

## :cloud: Cloudinary

This application requires [Cloudinary](https://cloudinary.com/), which is a Software-as-a-Service (SaaS) solution for managing media assets in the cloud. Just signup for a free account. After signing up you will find your configuration parameters in the cloudinary management console.

## :rocket: Installation

> Step 1: Rename .env.sample file to .env and configure the environment variables.

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

> Step 2: Install dependencies and bootstrap the application.

```bash
$ cd /path/to/root
$ npm install

## if you want to use yarn
$ yarn install

## development build
$ npm start

## production build
$ npm run production
```

## Unit Test

```bash
$ cd /path/to/root

## run unit tests
$ npm test

## generate coverage report
$ npm run coverage
```

## :key: License
<a href="https://opensource.org/licenses/MIT">The MIT License</a> Copyright &copy; 2019 Shibbir Ahmed
