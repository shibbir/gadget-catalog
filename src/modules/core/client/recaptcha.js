export const executeRecaptcha = async (action = "Submit") => {
    if (!window.grecaptcha || !window.grecaptcha.enterprise) {
        console.error("reCAPTCHA Enterprise not loaded!");
        return null;
    }

    try {
        return await new Promise((resolve) => {
            window.grecaptcha.enterprise.ready(async () => {
                const token = await window.grecaptcha.enterprise.execute(process.env.RECAPTCHA_ENTERPRISE_SITE_KEY, { action });
                resolve(token);
            });
        });
    } catch (err) {
        console.error("Error executing reCAPTCHA:", err);
        return null;
    }
};
