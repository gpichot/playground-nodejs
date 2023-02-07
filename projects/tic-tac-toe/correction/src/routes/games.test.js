import mongoose from "mongoose";
import supertest from "supertest";

import app from "../app";
import Game from "../models/game";
import { createNewBoard } from "../tictactoe.utils";

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI, { connectTimeoutMS: 2000 });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("GET /games/", () => {
  it("return the list of games", async () => {
    await Game.create({
      board: createNewBoard(),
    });

    const request = supertest(app);

    const response = await request.get("/games");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      expect.objectContaining({
        _id: expect.any(String),
        board: [
          ["", "", ""],
          ["", "", ""],
          ["", "", ""],
        ],
        isOver: false,
        winner: null,
      }),
    ]);
  });
});

describe("POST /games/", () => {
  it("creates a new game and returns it", async () => {
    const request = supertest(app);

    const response = await request.post("/games");

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      _id: expect.any(String),
      board: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ],
      isOver: false,
      winner: null,
    });
  });
});

describe("GET /games/:id", () => {
  it("returns a game", async () => {
    const game = await Game.create({
      board: createNewBoard(),
    });

    const request = supertest(app);

    const response = await request.get(`/games/${game._id}`);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      _id: game._id.toString(),
      board: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ],
      isOver: false,
      winner: null,
    });
  });
});

describe("POST /games/:id/move", () => {
  it("makes a move", async () => {
    const game = await Game.create({
      board: createNewBoard(),
    });

    const request = supertest(app);

    const response = await request.post(`/games/${game._id}/move`).send({
      x: 0,
      y: 0,
    });

    expect(response.status).toBe(202);
    expect(response.body).toMatchObject({
      _id: game._id.toString(),
      board: [
        ["X", "", ""],
        ["", "", ""],
        ["", "", ""],
      ],
      isOver: false,
      winner: null,
    });
  });

  it("raises an error for an invalid move", async () => {
    const game = await Game.create({
      board: createNewBoard(),
    });

    const request = supertest(app);

    const response = await request.post(`/games/${game._id}/move`).send({
      x: 4,
      y: 0,
    });

    expect(response.status).toBe(400);
  });

  it("raises en an error for a move a ticked cell", async () => {
    const game = await Game.create({
      board: [
        ["X", "", ""],
        ["", "", ""],
        ["", "", ""],
      ],
    });

    const request = supertest(app);

    const response = await request.post(`/games/${game._id}/move`).send({
      x: 0,
      y: 0,
    });

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      error: "Invalid move - position already taken",
    });
  });

  it("raises an error for a move on a finished game", async () => {
    const game = await Game.create({
      board: [
        ["X", "X", "X"],
        ["O", "O", ""],
        ["X", "O", ""],
      ],
      isOver: true,
      winner: "X",
    });

    const request = supertest(app);

    const response = await request.post(`/games/${game._id}/move`).send({
      x: 0,
      y: 2,
    });

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      error: "Game is over",
    });
  });

  it("finish the game when there is a winner", async () => {
    const game = await Game.create({
      board: [
        ["X", "X", ""],
        ["O", "O", ""],
        ["X", "", ""],
      ],
    });

    const request = supertest(app);

    const response = await request.post(`/games/${game._id}/move`).send({
      x: 2,
      y: 1,
    });

    expect(response.status).toBe(202);
    expect(response.body).toMatchObject({
      _id: game._id.toString(),
      board: [
        ["X", "X", ""],
        ["O", "O", "O"],
        ["X", "", ""],
      ],
      isOver: true,
      winner: "O",
    });
  });
});
