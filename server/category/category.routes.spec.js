const faker = require("faker");
const request = require("supertest");
const passport = require("passport");
const expect = require("chai").expect;
const Item = require("../item/item.model");
const Category = require("./category.model");
const app = require("../config/lib/express")();
const specHelper = require("../config/spec.helper");

require("../config/lib/passport")(passport);
require("./category.routes")(app, passport);

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
        const result = await request(app)
            .get("/api/categories")
            .set("Cookie", [`access_token=${user.accessToken}`]);

        expect(result.status).to.equal(200);
    });

    it("Should create a category", async function() {
        const result = await request(app)
            .post("/api/categories")
            .send({
                name: faker.commerce.productName()
            })
            .set("Cookie", [`access_token=${user.accessToken}`]);

        expect(result.status).to.equal(200);
    });

    it("Should fetch a category", async function() {
        const result = await request(app)
            .get(`/api/categories/${category._id}`)
            .set("Cookie", [`access_token=${user.accessToken}`]);

        expect(result.status).to.equal(200);
    });

    it("Should update an existing category", async function() {
        const result = await request(app)
            .put(`/api/categories/${category._id}`)
            .send({
                name: faker.commerce.productName()
            })
            .set("Cookie", [`access_token=${user.accessToken}`]);

        expect(result.status).to.equal(200);
    });
});
