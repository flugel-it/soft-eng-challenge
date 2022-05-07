const server = require("../bin/www");
const request = require("supertest");
const { expect } = require("chai");

describe("CREW API Tests", () => {
  it("POST /api/main/create-crew should fail to create a crew if no data is passed", async () => {
    const response = await request(server)
      .post("/api/main/create-crew")
      .set("Accept", "application/json");

    expect(response.status).to.equal(500);
    expect(response.text).to.equal(
      '{"error":{"message":"Error: no name passed"}}'
    );
  });

  it("POST /api/main/create-crew should create a crew", async () => {
    const response = await request(server)
      .post("/api/main/create-crew")
      .send({ crewName: "singing" })
      .set("Accept", "application/json");

    expect(response.status).to.equal(201);
    expect(response.text).to.equal('{"message":"crew created successfully"}');
  });
});
