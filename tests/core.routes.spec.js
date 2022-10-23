const path = require("path");
const request = require("supertest");

const app = require(path.join(process.cwd(), "src/config/server/lib/express"))();

describe("Core Routes", () => {
    test("Should respond with html if requst is not an ajax", async () => {
        const response = await request(app).get("/");

        expect(response.statusCode).toEqual(200);
    });
});
