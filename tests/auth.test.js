import mongoose from "mongoose";
import request from "supertest";
import app from "../server.js";

const user = {
  username: "wallace_test",
  password: "123456",
};

let token;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe("Jwt Auth Test", () => {
  it("should register a new user", async () => {
    const res = await request(app).post("/register").send(user);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
    token = res.body.token;
  });

  it("should login an existing user", async () => {
    const res = await request(app).post("/login").send(user);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  it("should access protected route with token", async () => {
    const res = await request(app)
      .get("/profile")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("user");
  });

  it("should deny access to protected route without token", async () => {
    const res = await request(app).get("/profile")
    expect(res.statusCode).toBe(401);
  });
});
