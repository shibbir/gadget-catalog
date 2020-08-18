const faker = require("faker");
const request = require("supertest");
const expect = require("chai").expect;

const specHelper = require("./spec.helper");
const Retailer = require("../src/modules/retailer/server/retailer.model");
const app = require("../src/config/server/lib/express")();

describe("Retailer Routes", function() {
    let retailer = {};
    const user = specHelper.users.admin;

    before(async function() {
        retailer = new Retailer({
            name: faker.company.companyName(),
            slug: specHelper.convertToSlug(faker.company.companyName()),
            createdBy: user._id
        });

        retailer = await retailer.save();
    });

    it("Should fetch all retailers", async function() {
        const response = await request(app)
            .get("/api/retailers")
            .set("Cookie", [`access_token=${user.accessToken}`]);

        expect(response.status).to.equal(200);
    });

    it("Should create new retailer", async function() {
        const response = await request(app)
            .post("/api/retailers")
            .send({
                name: faker.company.companyName()
            })
            .set("Cookie", [`access_token=${user.accessToken}`]);

        expect(response.status).to.equal(200);
    });

    it("Should get retailer by id", async function() {
        const response = await request(app)
            .get(`/api/retailers/${retailer._id}`)
            .set("Cookie", [`access_token=${user.accessToken}`]);

        expect(response.status).to.equal(200);
    });

    it("Should get 404 for requesting an invalid retailer", async function() {
        const response = await request(app).get("/api/retailers/5ed192c5709670e3e9badb4d").set("Cookie", [`access_token=${user.accessToken}`]);

        expect(response.status).to.equal(404);
    });

    it("Should update an existing retailer", async function() {
        const response = await request(app)
            .put(`/api/retailers/${retailer._id}`)
            .send({
                name: faker.company.companyName()
            })
            .set("Cookie", [`access_token=${user.accessToken}`]);

        expect(response.status).to.equal(200);
    });
});
