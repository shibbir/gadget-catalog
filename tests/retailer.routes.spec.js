const path = require("path");
const faker = require("faker");
const jwt = require("jsonwebtoken");
const request = require("supertest");
const mongoose = require("mongoose");

const app = require(path.join(process.cwd(), "src/config/server/lib/express"))();
const Retailer = require(path.join(process.cwd(), "src/modules/retailer/server/retailer.model"));

const convertToSlug = string => string.toLowerCase().replace(/[^\w ]+/g, "").replace(/ +/g, "-");
const access_token = jwt.sign({ id: global.__USERID__ }, process.env.TOKEN_SECRET, { expiresIn: "1h", issuer: global.__USERID__ });

describe("Retailer Routes", function() {
    let retailer;

    beforeAll(async () => {
        mongoose.connect(process.env.MONGODB_URI, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });

        retailer = new Retailer({
            name: faker.company.companyName(),
            slug: convertToSlug(faker.company.companyName()),
            createdBy: global.__USERID__
        });

        retailer = await retailer.save();
    });

    afterAll(() => {
        mongoose.connection.close();
    });

    test("Should fetch all retailers", async () => {
        const response = await request(app)
            .get("/api/retailers")
            .set("Cookie", [`access_token=${access_token}`]);

        expect(response.statusCode).toEqual(200);
    });

    test("Should create new retailer", async () => {
        const response = await request(app)
            .post("/api/retailers")
            .send({ name: faker.company.companyName() })
            .set("Cookie", [`access_token=${access_token}`]);

        expect(response.statusCode).toEqual(200);
    });

    test("Should get retailer by id", async () => {
        const response = await request(app)
            .get(`/api/retailers/${retailer._id}`)
            .set("Cookie", [`access_token=${access_token}`]);

        expect(response.statusCode).toEqual(200);
    });

    test("Should get 404 for requesting an invalid retailer", async () => {
        const response = await request(app)
            .get("/api/retailers/5ed192c5709670e3e9badb4d")
            .set("Cookie", [`access_token=${access_token}`]);

        expect(response.statusCode).toEqual(404);
    });

    test("Should update an existing retailer", async () => {
        const response = await request(app)
            .put(`/api/retailers/${retailer._id}`)
            .send({ name: faker.company.companyName() })
            .set("Cookie", [`access_token=${access_token}`]);

        expect(response.statusCode).toEqual(200);
    });
});
