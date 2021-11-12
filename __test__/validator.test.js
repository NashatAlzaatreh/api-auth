"use strict";

const { app } = require("../src/server");
const supertest = require("supertest");
const mockRequest = supertest(app);

describe("Validator", () => {
  test("500 if no name in the query string", async () => {
    const response = await mockRequest.get("/person");
    expect(response.status).toEqual(500);
  });

  test("200 if the name is in the query string", async () => {
    const response = await mockRequest.get("/person?name=nashat");
    expect(response.status).toEqual(200);
  });

  test("given an name in the query string, the output object is correct", async () => {
    const response = await mockRequest.get("/person?name=nashat");
    expect(response.body).toEqual({ name: "nashat" });
  });
});
