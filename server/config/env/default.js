module.exports = {
    app: {
        title: 'Digital Catalog',
        description: 'An archive to cataloging your digital stuff'
    },
    port: process.env.PORT || 4040,
    db: {
        promise: global.Promise
    }
};
