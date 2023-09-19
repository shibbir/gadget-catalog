<h1 align="center">
    :loudspeaker: Gadget Catalog
</h1>

<h4 align="center">A single page application for cataloging gadgets. Built with react, node.js, mongodb and much more.</h4>

<div align="center">
    <a href="https://dl.circleci.com/status-badge/redirect/gh/shibbir/gadget-catalog/tree/master">
        <img src="https://dl.circleci.com/status-badge/img/gh/shibbir/gadget-catalog/tree/master.svg?style=shield" alt="Build Status"/>
    </a>
    <a href="https://coveralls.io/github/shibbir/gadget-catalog">
        <img src="https://coveralls.io/repos/github/shibbir/gadget-catalog/badge.svg" alt="Coverage Status"/>
    </a>
    <a href="https://sonarcloud.io/summary/overall?id=shibbir_gadget-catalog">
        <img src="https://sonarcloud.io/api/project_badges/measure?project=shibbir_gadget-catalog&metric=reliability_rating" alt="Reliability Rating"/>
    </a>
    <a href="https://opensource.org/licenses/MIT">
        <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License"/>
    </a>
</div>

<div align="center">
    <sub>Yet another <a href="https://reactjs.org/">react.js</a> application. Built with ❤︎ by
    <a href="https://github.com/shibbir">Shibbir Ahmed</a> and
    <a href="https://github.com/shibbir/gadget-catalog/graphs/contributors">
        contributors.
    </a>
</div>

## :bookmark: Table of Contents
- [Built with](#hammer-built-with)
- [Configuring Cloudinary](#cloud-configuring-cloudinary)
- [Configuring environment variables](#key-configuring-environment-variables)
- [Installation and bootstrapping](#rocket-installation-and-bootstrapping)
- [Running tests](#heavy_check_mark-running-tests)
- [Demo](#flashlight-demo)
- [Bug or Feature Request](#beetle-bug-or-feature-request)
- [License](#memo-License)

## :hammer: Built with
- [Cloudinary](https://cloudinary.com/)
- [Draft.js](https://draftjs.org/)
- [Express](https://expressjs.com/)
- [Formik](https://jaredpalmer.com/formik/)
- [Highcharts](https://www.highcharts.com/)
- [Jest](https://jestjs.io/)
- [MongoDB](https://www.mongodb.com/)
- [Nodemailer](https://nodemailer.com/)
- [Passport](https://www.passportjs.org/)
- [React](https://reactjs.org/)
- [React Redux](https://react-redux.js.org/)
- [Semantic UI React](https://react.semantic-ui.com/)
- [Webpack](https://webpack.js.org/)

## :cloud: Configuring Cloudinary
This application requires [Cloudinary](https://cloudinary.com/), which is a Software-as-a-Service (SaaS) solution for managing media assets in the cloud. Just signup for a free account. After signing up you will find your configuration parameters in cloudinary management [console.](https://cloudinary.com/console)

## :key: Configuring environment variables
> Rename .env.example file to .env and adjust your environment variables. Details for each environment variables are below:

Name | Mandatory | Description
------------ | ------------- | -------------
PORT | Yes | On which port the web server will be listen to.
MONGODB_URI | Yes | MongoDB connection string URI. For more details visit [here](https://docs.mongodb.com/manual/reference/connection-string/).
TOKEN_SECRET | Yes | A secret string to generate an access token. Learn more from [here](https://jwt.io/introduction/).
REFRESH_SECRET | Yes | A secret string to generate a refresh token. Learn more from [here](https://jwt.io/introduction/).
GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET | No | Your OAuth 2.0 client credentials from google. Learn more from [here](https://developers.google.com/identity/protocols/OAuth2).
FACEBOOK_CLIENT_ID and FACEBOOK_CLIENT_SECRET | No | Your OAuth 2.0 client credentials from facebook. Learn more from [here](https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow).
CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET | Yes | After signing up for a free account in [Cloudinary](https://cloudinary.com/), go to your [dashboard](https://cloudinary.com/console) to obtain the required credentials to access their api. Learn more from [here](https://cloudinary.com/documentation).
SMTP_HOST, MAILER_ADDRESS, and MAILER_PASSWORD | Yes | Your mail server's smtp address and your email credentials. Learn more from [here](https://nodemailer.com/smtp/). If you want to use gmail to send emails you have to allow non secure apps to access gmail. You can do this by going to your gmail settings [here](https://myaccount.google.com/lesssecureapps).
SENTRY_DSN | No | Data Source Name(DSN) value for enabling [Sentry](https://sentry.io).

## :rocket: Installation and bootstrapping
> You need to have [Node.js](https://nodejs.org/en/) and [Yarn](https://yarnpkg.com/lang/en/) installed on your machine before running the followings:

```bash
$ yarn install     # install dependencies

$ yarn start       # development build

$ yarn production  # production build
```

## :heavy_check_mark: Running Tests
```bash
$ yarn test       # run unit tests

$ yarn coverage   # generate coverage report
```

## :flashlight: Demo
Here is a working live demo :  https://gadget-catalog-io.herokuapp.com/

## :beetle: Bug or Feature Request
If you find a bug, kindly open an issue [here](https://github.com/shibbir/gadget-catalog/issues/new) by including your step by step to reproduce the issue.

If you'd like to request a new feature, feel free to do so by opening an issue [here](https://github.com/shibbir/gadget-catalog/issues/new).

## :memo: License
<a href="https://opensource.org/licenses/MIT">The MIT License.</a> Copyright &copy; 2023 [Shibbir Ahmed.](https://shibbir.io/)
