const path = require("path");
const jwt = require("jsonwebtoken");
const request = require("supertest");
const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");

const app = require(path.join(process.cwd(), "src/config/server/lib/express"))();

const access_token = jwt.sign({ id: global.__USERID__ }, process.env.TOKEN_SECRET, { expiresIn: "1h", issuer: global.__USERID__ });
const refresh_token = jwt.sign({ id: global.__USERID__ }, process.env.REFRESH_SECRET, { expiresIn: "1d", issuer: global.__USERID__ });

describe("User Routes", function() {
    beforeAll(async () => {
        mongoose.connect(process.env.MONGODB_URI);
    });

    afterAll(() => {
        mongoose.connection.close();
    });

    test("Should create a basic user", async () => {
        const response = await request(app)
            .post("/api/register")
            .send({
                name: faker.person.fullName(),
                email: faker.internet.email(),
                password: faker.internet.password({ length: 8 })
            });

        expect(response.statusCode).toEqual(200);
    });

    test("Should login with valid username and password", async () => {
        const response = await request(app)
            .post("/api/login")
            .send({
                username: global.__USERNAME__,
                password: global.__PASSWORD__,
                grant_type: "password"
            });

        expect(response.statusCode).toEqual(200);
    });

    test("Should fetch profile for signed in user", async () => {
        const response = await request(app)
            .get("/api/profile")
            .set("Cookie", [`access_token=${access_token};refresh_token=${refresh_token}`]);

        expect(response.statusCode).toEqual(200);
    });

    test("Should get unauthorized error for an invalid access token", async () => {
        const fake_access_token = jwt.sign({ id: global.__USERID__ }, process.env.TOKEN_SECRET, { expiresIn: "-10s", issuer: global.__USERID__ });
        const fake_refresh_token = jwt.sign({ id: global.__USERID__ }, process.env.TOKEN_SECRET, { expiresIn: "1h", issuer: global.__USERID__ });

        const response = await request(app)
            .get("/api/profile")
            .set("Cookie", [`access_token=${fake_access_token};refresh_token=${fake_refresh_token}`]);

        expect(response.statusCode).toEqual(401);
    });

    test("Should allow user to update the password", async () => {
        const response = await request(app)
            .put("/api/profile/change-password")
            .set("Cookie", [`access_token=${access_token};refresh_token=${refresh_token}`])
            .send({
                currentPassword: global.__PASSWORD__,
                newPassword: faker.internet.password({ length: 8 })
            });

        expect(response.statusCode).toEqual(200);
    });

    test("Should send an email if user forgets password", async () => {
        const response = await request(app)
            .post("/api/forgot-password")
            .send({ email: global.__USERNAME__ })
            .set("Cookie", [`access_token=${access_token};refresh_token=${refresh_token}`]);

        expect(response.statusCode).toEqual(200);
    });
});
