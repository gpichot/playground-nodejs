import app from "./app.js";
import supertest from "supertest";
import { describe, it, expect } from "vitest";

describe("GET /ping", () => {
  it("[200] should return pong", async () => {
    const request = supertest(app);

    const response = await request.get("/ping").send();

    expect(response.status).toEqual(200);
    expect(response.text).toEqual("pong");
  });
});
