import supertest from "supertest";
import express from "express";

import db from "@/database";

import router from "./routes";

describe("Authentication Router /sign-up", () => {
  const app = express();
  app.use(express.json());
  app.use("/", router);

  beforeAll(async () => {
    await db.collection("users").deleteMany({});
  });

  it("should create user", async () => {
    const response = await supertest(app)
      .post("/sign-up")
      .send({
        username: "johnd",
        password: "1234",
      })
      .expect(201);

    expect(response.body).toEqual({});
  });

  it("should return bad request with short username", async () => {
    const response = await supertest(app)
      .post("/sign-up")
      .send({
        username: "j",
        password: "1234",
      })
      .expect(400);

    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0]).toEqual(
      expect.objectContaining({
        message: "String must contain at least 4 character(s)",
        path: ["username"],
      })
    );
  });
});
