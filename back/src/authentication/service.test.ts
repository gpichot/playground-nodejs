import db from "@/database";

import { createUser } from "./service";

describe("Authentication Service - createUser", () => {
  beforeAll(async () => {
    await db.collection("users").deleteMany({});
    await db.collection("users").insertOne({
      username: "test",
    });
  });
  it("creates user", async () => {
    await createUser({
      username: "johnd",
      password: "12345",
    });

    const user = await db.collection("users").findOne({ username: "johnd" });

    expect(user).toEqual(
      expect.objectContaining({
        username: "johnd",
      })
    );
  });

  it("fails if user with existing username exists", async () => {
    await expect(
      createUser({
        username: "test",
        password: "12345",
      })
    ).rejects.toThrowError(/already exists/i);
  });
});
