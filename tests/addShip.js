const server = require("../bin/www");
const request = require("supertest");
const { expect } = require("chai");

describe("ADD SHIP API Tests", () => {
  it("POST /api/main/add-ship should fail to add new ship if no data is passed", async () => {
    const response = await request(server)
      .post("/api/main/add-ship")
      .set("Accept", "application/json");

    expect(response.status).to.equal(500);
    expect(response.text).to.equal(
      '{"error":{"message":"Error: motherShip id not passed"}}'
    );
  });

  it("POST /api/main/add-ship should add new ship", async () => {
    const response = await request(server)
      .post("/api/main/add-ship")
      .send({ motherShipId: "6276dddd0b813fc416c38fa4", numberOfShips: "1" })
      .set("Accept", "application/json");

    expect(response.status).to.equal(200);
    expect(response.text).to.equal('{"message":"ship created successfully"}');
  });
});