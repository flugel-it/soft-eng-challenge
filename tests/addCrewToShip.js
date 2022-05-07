const server = require("../bin/www");
const request = require("supertest");
const { expect } = require("chai");

describe("ADD CREW TO SHIP API Tests", () => {
  it("POST /api/main/add-crew-to-ship should fail to add new crew member to a ship if no data is passed", async () => {
    const response = await request(server)
      .post("/api/main/add-crew-to-ship")
      .set("Accept", "application/json");

    expect(response.status).to.equal(500);
    expect(response.text).to.equal(
      '{"error":{"message":"Error: no name passed"}}'
    );
  });

  it("POST /api/main/add-crew-to-ship should add new crew member to a ship", async () => {
    const response = await request(server)
      .post("/api/main/add-crew-to-ship")
      .send({ name: "john", shipId: "6276d832c3cb1537fb44be7f" })
      .set("Accept", "application/json");

    expect(response.status).to.equal(200);
    expect(response.text).to.equal('{"message":"crew added successfully"}');
  });
});