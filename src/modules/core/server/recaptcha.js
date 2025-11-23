const axios = require("axios");

async function verifyRecaptcha(token, action) {
    const { data } = await axios.post(`https://recaptchaenterprise.googleapis.com/v1/projects/${process.env.RECAPTCHA_PROJECT}/assessments?key=${process.env.RECAPTCHA_ENTERPRISE_API_KEY}`, {
        event: {
            token,
            expectedAction: action,
            siteKey: process.env.RECAPTCHA_ENTERPRISE_SITE_KEY
        }
    });
    return data;
}

module.exports = { verifyRecaptcha };
