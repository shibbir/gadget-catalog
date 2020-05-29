const faker = require("faker");
const request = require("supertest");
const expect = require("chai").expect;

const specHelper = require("./spec.helper");
const Brand = require("../src/modules/brand/server/brand.model");
const app = require("../src/config/server/lib/express")();

describe("Brand Routes", function() {
    let brand = {};
    const user = specHelper.users.admin;

    before(async function() {
        brand = new Brand({
            name: faker.company.companyName(),
            slug: specHelper.convertToSlug(faker.company.companyName()),
            createdBy: user._id
        });

        brand = await brand.save();
    });

    it("Should fetch all brands", async function() {
        const result = await request(app).get("/api/brands").set("Cookie", [`access_token=${user.accessToken}`]);

        expect(result.status).to.equal(200);
    });

    it("Should create new brand", async function() {
        const result = await request(app)
            .post("/api/brands")
            .send({
                name: faker.company.companyName()
            })
            .set("Cookie", [`access_token=${user.accessToken}`]);

        expect(result.status).to.equal(200);
    });

    it("Should fetch a brand", async function() {
        const result = await request(app).get(`/api/brands/${brand._id}`).set("Cookie", [`access_token=${user.accessToken}`]);

        expect(result.status).to.equal(200);
    });

    it("Should get 404 for requesting an invalid brand", async function() {
        const result = await request(app).get("/api/brands/5ed192c5709670e3e9badb4d").set("Cookie", [`access_token=${user.accessToken}`]);

        expect(result.status).to.equal(404);
    });

    it("Should update an existing brand", async function() {
        const result = await request(app)
            .put(`/api/brands/${brand._id}`)
            .send({
                name: faker.company.companyName()
            })
            .set("Cookie", [`access_token=${user.accessToken}`]);

        expect(result.status).to.equal(200);
    });
});
