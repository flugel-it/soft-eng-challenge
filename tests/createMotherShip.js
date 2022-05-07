const server = require("../bin/www");
const request = require("supertest");
const { expect } = require("chai");

describe("MOTHERSHIP API Tests", () => {
  it("POST /api/main/create-mothershop should fail to create a mothership if no data is passed", async () => {
    const response = await request(server)
      .post("/api/main/create-mothershop")
      .set("Accept", "application/json");

    expect(response.status).to.equal(500);
    expect(response.text).to.equal(
      '{"error":{"message":"Error: no name passed"}}'
    );
  });

  it("POST /api/main/create-mothershop should create a mothership", async () => {
    const response = await request(server)
      .post("/api/main/create-mothershop")
      .send({ name: "john" })
      .set("Accept", "application/json");

    expect(response.status).to.equal(201);
    expect(response.text).to.equal(
      '{"message":"Mother ship created successfully"}'
    );
  });
});
