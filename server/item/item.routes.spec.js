const faker = require("faker");
const request = require("supertest");
const passport = require("passport");
const expect = require("chai").expect;
const Item = require("./item.model");
const Brand = require("../brand/brand.model");
const Category = require("../category/category.model");
const app = require("../config/lib/express")();
const specHelper = require("../config/spec.helper");

require("../config/lib/passport")(passport);
require("./item.routes")(app, passport);

describe("Item Routes", function() {
    let category = {};
    let brand = {};
    let item = {};
    const user = specHelper.users.admin;

    before(async function() {
        category = new Category({
            name: faker.commerce.productName(),
            slug: specHelper.convertToSlug(faker.commerce.productName()),
            createdBy: user._id
        });

        category = await category.save();

        brand = new Brand({
            name: faker.commerce.productName(),
            slug: specHelper.convertToSlug(faker.commerce.productName()),
            createdBy: user._id
        });

        brand = await brand.save();

        item = new Item({
            name: faker.commerce.productName(),
            categoryId: category._id,
            brandId: brand._id,
            createdBy: user._id
        });

        item = await item.save();
    });

    it("Should get all items", async function() {
        const result = await request(app)
            .get("/api/items")
            .set("Cookie", [`access_token=${user.accessToken}`]);

        expect(result.status).to.equal(200);
    });

    it("Should create a new item", async function() {
        const result = await request(app)
            .post("/api/items")
            .send({
                name: faker.commerce.productName(),
                categoryId: category._id,
                brandId: brand._id
            })
            .set("Cookie", [`access_token=${user.accessToken}`]);

        expect(result.status).to.equal(200);
    });

    it("Should get an item", async function() {
        const result = await request(app)
            .get(`/api/items/${item._id}`)
            .set("Cookie", [`access_token=${user.accessToken}`]);

        expect(result.status).to.equal(200);
    });

    it("Should update an existing item", async function() {
        const result = await request(app)
            .put(`/api/items/${item._id}`)
            .send({
                name: faker.commerce.productName(),
                categoryId: category._id,
                brandId: brand._id
            })
            .set("Cookie", [`access_token=${user.accessToken}`]);

        expect(result.status).to.equal(200);
    });
});
