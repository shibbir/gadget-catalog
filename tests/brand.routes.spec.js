const path = require("path");
const jwt = require("jsonwebtoken");
const request = require("supertest");
const mongoose = require("mongoose");
const cookie = require("cookie-signature");
const { faker } = require("@faker-js/faker");

const app = require(path.join(process.cwd(), "src/config/server/lib/express"))();
const Brand = require(path.join(process.cwd(), "src/modules/brand/server/brand.model"));

const convertToSlug = string => string.toLowerCase().replace(/[^\w ]+/g, "").replace(/ +/g, "-");
const access_token = jwt.sign({ id: global.__USERID__ }, process.env.TOKEN_SECRET, { expiresIn: "1h", issuer: global.__USERID__ });
const signed_access_token = cookie.sign(access_token, process.env.COOKIE_SECRET);

describe("Brand Routes", function() {
    let brand;

    beforeAll(async () => {
        mongoose.connect(process.env.MONGODB_URI);

        brand = new Brand({
            name: faker.company.name(),
            slug: convertToSlug(faker.company.name()),
            createdBy: global.__USERID__
        });

        brand = await brand.save();
    });

    afterAll(() => {
        mongoose.connection.close();
    });

    test("Should fetch all the brands", async () => {
        const response = await request(app)
            .get("/api/brands")
            .set("Cookie", [`access_token=s:${signed_access_token}`]);

        expect(response.statusCode).toEqual(200);
    });

    test("Should create new brand", async () => {
        const response = await request(app)
            .post("/api/brands")
            .send({ name: faker.company.name() })
            .set("Cookie", [`access_token=s:${signed_access_token}`]);

        expect(response.statusCode).toEqual(200);
    });

    test("Should get brand by id", async () => {
        const response = await request(app)
            .get(`/api/brands/${brand._id}`)
            .set("Cookie", [`access_token=s:${signed_access_token}`]);

        expect(response.statusCode).toEqual(200);
    });

    test("Should get 404 for requesting an invalid brand", async () => {
        const response = await request(app)
            .get("/api/brands/5ed192c5709670e3e9badb4d").
            set("Cookie", [`access_token=s:${signed_access_token}`]);

        expect(response.statusCode).toEqual(404);
    });

    test("Should update an existing brand", async () => {
        const response = await request(app)
            .put(`/api/brands/${brand._id}`)
            .send({ name: faker.company.name() })
            .set("Cookie", [`access_token=s:${signed_access_token}`]);

        expect(response.statusCode).toEqual(200);
    });
});
