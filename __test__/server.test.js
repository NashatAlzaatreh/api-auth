"use strict";

const { app } = require("../src/server");
const supertest = require("supertest");
const request = supertest(app);
const { db } = require("../src/models/index");

beforeAll(async () => {
  await db.sync();
});

afterAll(async () => {
  await db.drop();
});

describe("API Server Testing", () => {
  test("handle invalid URLS", async () => {
    const response = await request.get("/not-found");
    expect(response.status).toEqual(404);
  });

  test("if there is a home route", async () => {
    const response = await request.get("/");
    expect(response.status).toEqual(200);
    expect(response.text).toEqual(
      "All our dreams can come true, if we have the courage to pursue them 💪👨‍💻️"
    );
  });

  test("/data works", async () => {
    const response = await request.get("/data");
    expect(response.status).toEqual(200);
    expect(typeof response.body).toEqual("object");
  });
  test("stamper middleware works", async () => {
    const response = await request.get("/data");
    expect(response.status).toEqual(200);
    expect(response.body.time).toBeDefined();
  });

  test("404 on a bad route", async () => {
    const response = await request.get("/bads");
    expect(response.status).toEqual(404);
  });

  test("404 on a bad method", async () => {
    const response = await request.post("/bad");
    expect(response.status).toBe(404);
  });

  xit("can add a food", async () => {
    const response = await request.post("/food").send({
      name: "test55",
      price: "55",
    });

    expect(response.status).toBe(201);
  });

  xit("can add a clothes", async () => {
    const response = await request.post("/clothes").send({
      name: "jacketaa",
      price: "250",
    });

    expect(response.status).toBe(201);
  });

  // test if can read

  it("can get all food", async () => {
    const response = await request.get("/food");

    expect(response.status).toBe(200);
  });

  it("can get all clothes", async () => {
    const response = await request.get("/clothes");

    expect(response.status).toBe(200);
  });

  // test if can read one person
  it("can get one food item", async () => {
    const response = await request.get("/food/1");

    expect(response.status).toBe(200);
  });

  it("can get one clothes item", async () => {
    const response = await request.get("/clothes/1");

    expect(response.status).toBe(200);
  });

  // test if can update a person
  xit("can update one food item", async () => {
    const response = await request.put("/food/1").send({
      name: "Burger",
      price: 15,
    });

    expect(response.status).toBe(201);
  });

  xit("can update one clothes item", async () => {
    const response = await request.put("/clothes/1").send({
      name: "jacket",
      price: 25,
    });

    expect(response.status).toBe(201);
  });
  // test if can delete a person
  it("should delete a food item", async () => {
    const food = await request.delete("/food/1");
    expect(food.status).toBe(204);
  });

  it("should delete a clothes item", async () => {
    const clothes = await request.delete("/clothes/1");
    expect(clothes.status).toEqual(204);
  });
});
