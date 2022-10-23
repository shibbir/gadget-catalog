if(process.env.NODE_ENV === "production") {
    const Sentry = require("@sentry/node");
    Sentry.init({ dsn: process.env.SENTRY_DSN });
}

const app = require("./src/config/server/lib/app");
app.start();
