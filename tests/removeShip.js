const server = require("../bin/www");
const request = require("supertest");
const { expect } = require("chai");

describe("REMOVE SHIP API Tests", () => {
  it("DELETE /api/main/remove-ship should fail if invalid ship id is passed", async () => {
    const response = await request(server)
      .delete("/api/main/remove-ship")
      .send({ shipId: "6276dddd0b813fc416c38fa9" })
      .set("Accept", "application/json");
    expect(response.status).to.equal(500);
    expect(response.text).to.equal(
      '{"error":{"message":"Error: Ship does not exist"}}'
    );
  });

  it("DELETE /api/main/remove-ship should remove ship from list of ships", async () => {
    const response = await request(server)
      .delete("/api/main/remove-ship")
      .send({ shipId: "6276de91abdf8a96ae034a83" })
      .set("Accept", "application/json");

    expect(response.status).to.equal(200);
    expect(response.text).to.equal('{"message":"Ship deleted successfully"}');
  });
});