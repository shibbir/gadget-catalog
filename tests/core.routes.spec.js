const path = require("path");
const request = require("supertest");
const expect = require("chai").expect;
const app = require(path.join(process.cwd(), "src/config/server/lib/express"))();

describe("Core Routes", () => {
    it("Should respond with html if requst is not an ajax", async () => {
        const result = await request(app).get("/");

        expect(result.status).to.equal(200);
    });
});
