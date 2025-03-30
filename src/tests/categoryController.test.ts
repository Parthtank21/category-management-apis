import request from "supertest";
import { app, server } from "../server";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import Category from "../models/categoryModel";

let mongoServer: MongoMemoryServer;
let authToken: string;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  
  await mongoose.disconnect(); 
  await mongoose.connect(mongoServer.getUri(), { dbName: "testDB" });

  await request(app).post("/api/auth/register").send({
    username: "testuser",
    email: "test@example.com",
    password: "password123",
  });

  const loginRes = await request(app).post("/api/auth/login").send({
    email: "test@example.com",
    password: "password123",
  });

  authToken = loginRes.body.token;
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
  server.close();
});

describe("Category API Tests", () => {
  let categoryId: string;

  it("should create a category", async () => {
    const res = await request(app)
      .post("/api/category")
      .set("Authorization", `Bearer ${authToken}`)
      .send({ name: "Electronics" });

    expect(res.status).toBe(201);
    expect(res.body.name).toBe("Electronics");
    categoryId = res.body._id;
  });

  it("should fetch all categories", async () => {
    const res = await request(app)
      .get("/api/category")
      .set("Authorization", `Bearer ${authToken}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should update a category", async () => {
    const res = await request(app)
      .put(`/api/category/${categoryId}`)
      .set("Authorization", `Bearer ${authToken}`)
      .send({ name: "Updated Electronics", status: "inactive" });

    expect(res.status).toBe(200);
    expect(res.body.name).toBe("Updated Electronics");
    expect(res.body.status).toBe("inactive");
  });

  it("should delete a category and reassign children", async () => {
    const res = await request(app)
      .delete(`/api/category/${categoryId}`)
      .set("Authorization", `Bearer ${authToken}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Category deleted and children reassigned");
  });
});
