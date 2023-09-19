module.exports = {
    coverageDirectory: "coverage",
    coverageProvider: "v8",
    globalSetup: "./jest/jest.setup.js",
    globalTeardown: "./jest/jest.teardown.js",
    testEnvironment: "node",
    globals: {
        __USERID__: "58e8d591a643633a109f29bc",
        __USERNAME__: "admin@gadgetcatalog.com",
        __PASSWORD__: "P@ssw0rd"
    }
};
