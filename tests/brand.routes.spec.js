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
        const response = await request(app)
            .post("/graphql")
            .set("Cookie", [`access_token=${user.accessToken}`])
            .send({ query: "query { brands { _id name createdBy }}" });

        expect(response.status).to.equal(200);
    });

    it("Should create new brand", async function() {
        const response = await request(app)
            .post("/graphql")
            .send({ query: `
                mutation {
                    createBrand(brand: {name: "${faker.company.companyName()}" }) {
                        _id name createdBy
                    }
                }
            `})
            .set("Cookie", [`access_token=${user.accessToken}`]);

        expect(response.body.data.createBrand).to.have.property("_id");
        expect(response.body.data.createBrand).to.have.property("name");
        expect(response.body.data.createBrand).to.have.property("createdBy");
    });

    it("Should get brand by id", async function() {
        const response = await request(app)
            .post("/graphql")
            .send({ query: `query { brand(_id: "${brand._id}") { _id name }}` })
            .set("Cookie", [`access_token=${user.accessToken}`]);

        expect(response.body.data.brand).to.have.property("name");
        expect(response.body.data.brand.name).to.equal(brand.name);
        expect(response.body.data.brand._id).to.equal(brand._id.toString());
    });

    it("Should get null data for an invalid id", async function() {
        const response = await request(app)
            .post("/graphql")
            .send({ query: `query { brand(_id: "5ed192c5709670e3e9badb4d") { _id name }}` })
            .set("Cookie", [`access_token=${user.accessToken}`]);

        expect(response.body.data.brand).to.be.null;
    });

    it("Should update an existing brand", async function() {
        const response = await request(app)
            .post("/graphql")
            .send({ query: `
                mutation {
                    updateBrand(brand: {_id: "${brand._id}", name: "${faker.company.companyName()}" }) {
                        _id name createdBy
                    }
                }
            `})
            .set("Cookie", [`access_token=${user.accessToken}`]);

        expect(response.body.data.updateBrand).to.have.property("_id");
        expect(response.body.data.updateBrand).to.have.property("name");
        expect(response.body.data.updateBrand).to.have.property("createdBy");
    });
});
