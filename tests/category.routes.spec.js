const faker = require("faker");
const request = require("supertest");
const expect = require("chai").expect;

const specHelper = require("./spec.helper");
const Category = require("../src/modules/category/server/category.model");
const app = require("../src/config/server/lib/express")();

describe("Category Routes", function() {
    let category = {};
    const user = specHelper.users.admin;

    before(async function() {
        category = new Category({
            name: faker.commerce.productName(),
            slug: specHelper.convertToSlug(faker.commerce.productName()),
            createdBy: user._id
        });

        category = await category.save();
    });

    it("Should fetch all categories", async function() {
        const response = await request(app)
            .post("/graphql")
            .set("Cookie", [`access_token=${user.accessToken}`])
            .send({ query: "query { categories { _id name }}" });

        expect(response.status).to.equal(200);
    });

    it("Should create a new category", async function() {
        const response = await request(app)
            .post("/graphql")
            .send({ query: `
                mutation {
                    createCategory(category: {name: "${faker.commerce.productName()}" }) {
                        _id name
                    }
                }
            `})
            .set("Cookie", [`access_token=${user.accessToken}`]);

        expect(response.body.data.createCategory).to.have.property("_id");
        expect(response.body.data.createCategory).to.have.property("name");
    });

    it("Should get category by id", async function() {
        const response = await request(app)
            .post("/graphql")
            .send({ query: `query { category(_id: "${category._id}") { _id name }}` })
            .set("Cookie", [`access_token=${user.accessToken}`]);

        expect(response.body.data.category).to.have.property("name");
        expect(response.body.data.category.name).to.equal(category.name);
        expect(response.body.data.category._id).to.equal(category._id.toString());
    });

    it("Should update an existing category", async function() {
        const response = await request(app)
            .post("/graphql")
            .send({ query: `
                mutation {
                    updateCategory(category: {_id: "${category._id}", name: "${faker.commerce.productName()}" }) {
                        _id name
                    }
                }
            `})
            .set("Cookie", [`access_token=${user.accessToken}`]);

        expect(response.body.data.updateCategory).to.have.property("_id");
        expect(response.body.data.updateCategory).to.have.property("name");
    });
});
