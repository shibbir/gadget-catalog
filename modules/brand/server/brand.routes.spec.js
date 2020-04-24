const faker = require("faker");
const request = require("supertest");
const expect = require("chai").expect;

const Brand = require("./brand.model");
const app = require("../../../config/server/lib/express")();
const specHelper = require("../../../config/server/spec.helper");

describe("Brand Api", function() {
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
