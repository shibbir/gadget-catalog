const path = require("path");
const jwt = require("jsonwebtoken");
const request = require("supertest");
const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");

const app = require(path.join(process.cwd(), "src/config/server/lib/express"))();
const Category = require(path.join(process.cwd(), "src/modules/category/server/category.model"));

const convertToSlug = string => string.toLowerCase().replace(/[^\w ]+/g, "").replace(/ +/g, "-");
const access_token = jwt.sign({ id: global.__USERID__ }, process.env.TOKEN_SECRET, { expiresIn: "1h", issuer: global.__USERID__ });

describe("Category Routes", function() {
    let category;

    beforeAll(async () => {
        mongoose.connect(process.env.MONGODB_URI);

        category = new Category({
            name: faker.commerce.productName(),
            slug: convertToSlug(faker.commerce.productName()),
            createdBy: global.__USERID__
        });

        category = await category.save();
    });

    afterAll(() => {
        mongoose.connection.close();
    });

    test("Should fetch all categories", async () => {
        const response = await request(app)
            .get("/api/categories")
            .set("Cookie", [`access_token=${access_token}`]);

        expect(response.statusCode).toEqual(200);
    });

    test("Should create a new category", async () => {
        const response = await request(app)
            .post("/api/categories")
            .send({ name: faker.commerce.productName() })
            .set("Cookie", [`access_token=${access_token}`]);

        expect(response.statusCode).toEqual(200);
    });

    test("Should get category by id", async () => {
        const response = await request(app)
            .get(`/api/categories/${category._id}`)
            .set("Cookie", [`access_token=${access_token}`]);

        expect(response.statusCode).toEqual(200);
    });

    test("Should update an existing category", async () => {
        const response = await request(app)
            .put(`/api/categories/${category._id}`)
            .send({ name: faker.commerce.productName() })
            .set("Cookie", [`access_token=${access_token}`]);

        expect(response.statusCode).toEqual(200);
    });
});
