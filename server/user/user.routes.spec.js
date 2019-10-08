const faker = require("faker");
const request = require("supertest");
const passport = require("passport");
const expect = require("chai").expect;
const app = require("../config/lib/express")();
const specHelper = require("../config/spec.helper");

require("../config/lib/passport")(passport);
require("./user.routes")(app, passport);

describe("User Routes", function() {
    const user = specHelper.users.admin;

    it("Should create a basic user", async function() {
        const result = await request(app)
            .post("/api/register")
            .send({
                name: faker.name.findName(),
                email: faker.internet.email(),
                password: "password"
            });

        expect(result.status).to.equal(200);
    });

    it("Should login with valid username and password", async function() {
        const result = await request(app)
            .post("/api/login")
            .send({
                email: user.email,
                password: user.password
            });

        expect(result.status).to.equal(200);
    });

    it("Should fetch profile for signed in user", async function() {
        const result = await request(app)
            .get("/api/profile")
            .set("Cookie", [`access_token=${user.accessToken}`]);

        expect(result.status).to.equal(200);
    });

    it("Should allow user to update the password", async function() {
        const result = await request(app)
            .put("/api/profile/password")
            .set("Cookie", [`access_token=${user.accessToken}`])
            .send({
                currentPassword: user.password,
                newPassword: "xxx-xxx-xxx-xxx"
            });

        expect(result.status).to.equal(200);
    });
});
