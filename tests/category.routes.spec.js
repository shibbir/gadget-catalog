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
            .get("/api/categories")
            .set("Cookie", [`access_token=${user.accessToken}`]);

        expect(response.status).to.equal(200);
    });

    it("Should create a new category", async function() {
        const response = await request(app)
            .post("/api/categories")
            .send({
                name: faker.commerce.productName()
            })
            .set("Cookie", [`access_token=${user.accessToken}`]);

        expect(response.status).to.equal(200);
    });

    it("Should get category by id", async function() {
        const response = await request(app)
            .get(`/api/categories/${category._id}`)
            .set("Cookie", [`access_token=${user.accessToken}`]);

        expect(response.status).to.equal(200);
    });

    it("Should update an existing category", async function() {
        const response = await request(app)
            .put(`/api/categories/${category._id}`)
            .send({
                name: faker.commerce.productName()
            })
            .set("Cookie", [`access_token=${user.accessToken}`]);

        expect(response.status).to.equal(200);
    });
});
