const server = require("../bin/www");
const request = require("supertest");
const { expect } = require("chai");

describe("SWITCH SHIP API Tests", () => {
  it("PUT /api/main/switch-crew should fail if invalid From_ship id is passed", async () => {
    const response = await request(server)
      .put("/api/main/switch-crew")
      .set("Accept", "application/json");
    expect(response.status).to.equal(500);
    expect(response.text).to.equal(
      '{"error":{"message":"Error: no from_ship id passed"}}'
    );
  });

  it("PUT /api/main/switch-crew should switch crew to a different ship", async () => {
    const response = await request(server)
      .put("/api/main/switch-crew")
      .send({  from_ship: "6276dddd0b813fc416c38fb5",to_ship:"6276dddd0b813fc416c38fad", crewName:"26dw6" })
      .set("Accept", "application/json");

    expect(response.status).to.equal(200);
    expect(response.text).to.equal('{"message":"Crew switched successfully"}');
  });
});