const path = require("path");
const jwt = require("jsonwebtoken");
const request = require("supertest");
const mongoose = require("mongoose");
const cookie = require("cookie-signature");
const { faker } = require("@faker-js/faker");

const app = require(path.join(process.cwd(), "src/config/server/lib/express"))();
const Item = require(path.join(process.cwd(), "src/modules/item/server/item.model"));
const Brand = require(path.join(process.cwd(), "src/modules/brand/server/brand.model"));
const Category = require(path.join(process.cwd(), "src/modules/category/server/category.model"));

const convertToSlug = string => string.toLowerCase().replace(/[^\w ]+/g, "").replace(/ +/g, "-");
const access_token = jwt.sign({ id: global.__USERID__ }, process.env.TOKEN_SECRET, { expiresIn: "1h", issuer: global.__USERID__ });
const signed_access_token = cookie.sign(access_token, process.env.COOKIE_SECRET);

describe("Item Routes", function() {
    let category;
    let brand;
    let item;

    beforeAll(async () => {
        mongoose.connect(process.env.MONGODB_URI);

        brand = new Brand({
            name: faker.company.name(),
            slug: convertToSlug(faker.company.name()),
            createdBy: global.__USERID__
        });

        brand = await brand.save();

        category = new Category({
            name: faker.commerce.productName(),
            slug: convertToSlug(faker.commerce.productName()),
            createdBy: global.__USERID__
        });

        category = await category.save();

        item = new Item({
            name: faker.commerce.productName(),
            categoryId: category._id,
            brandId: brand._id,
            createdBy: global.__USERID__,
            currency: "USD"
        });

        item = await item.save();
    });

    afterAll(() => {
        mongoose.connection.close();
    });

    test("Should fetch all the items", async () => {
        const response = await request(app)
            .get("/api/items")
            .set("Cookie", [`access_token=s:${signed_access_token}`]);

        expect(response.statusCode).toEqual(200);
    });

    test("Should create a new item", async () => {
        const response = await request(app)
            .post("/api/items")
            .send({
                name: faker.commerce.productName(),
                categoryId: category._id,
                brandId: brand._id,
                currency: "USD"
            })
            .set("Cookie", [`access_token=s:${signed_access_token}`]);

        expect(response.statusCode).toEqual(200);
    });

    test("Should fetch an item", async () => {
        const response = await request(app)
            .get(`/api/items/${item._id}`)
            .set("Cookie", [`access_token=s:${signed_access_token}`]);

        expect(response.statusCode).toEqual(200);
    });

    test("Should update an item", async () => {
        const response = await request(app)
            .put(`/api/items/${item._id}`)
            .send({
                name: faker.commerce.productName(),
                categoryId: category._id,
                brandId: brand._id,
                currency: "USD"
            })
            .set("Cookie", [`access_token=s:${signed_access_token}`]);

        expect(response.statusCode).toEqual(200);
    });

    test("Should fetch yearly report", async () => {
        const response = await request(app)
            .get("/api/items/item-count?start_year=2015&end_year=2019")
            .set("Cookie", [`access_token=s:${signed_access_token}`]);

        expect(response.statusCode).toEqual(200);
    });

    test("Should delete an item", async () => {
        const response = await request(app)
            .delete(`/api/items/${item._id}`)
            .set("Cookie", [`access_token=s:${signed_access_token}`]);

        expect(response.statusCode).toEqual(200);
    });
});
