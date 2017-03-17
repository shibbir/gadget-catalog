module.exports = {
    app: {
        title: 'Gadget Catalog',
        description: 'A react application for cataloging gadgets'
    },
    port: process.env.PORT || 4040,
    tokenSecret: 'a17dd903-6ffa-46d4-901a-3d34b55fce2b',
    db: {
        promise: global.Promise
    },
    noImageUrl: 'https://res.cloudinary.com/shibbir/image/upload/v1487437653/miscellaneous/no-img.png'
};
