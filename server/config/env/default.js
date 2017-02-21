module.exports = {
    app: {
        title: 'Gadget Catalog',
        description: 'A react application for cataloging gadgets'
    },
    port: process.env.PORT || 4040,
    db: {
        promise: global.Promise
    },
    defaultImageUrl: 'https://res.cloudinary.com/shibbir/image/upload/v1487437653/miscellaneous/no-img.png'
};
