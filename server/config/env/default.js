module.exports = {
    app: {
        title: 'Digital Catalog',
        description: 'An archive to cataloging your digital stuff'
    },
    port: process.env.PORT || 4040,
    db: {
        promise: global.Promise
    },
    defaultImageUrl: 'https://res.cloudinary.com/shibbir/image/upload/v1487437653/miscellaneous/no-img.png'
};
