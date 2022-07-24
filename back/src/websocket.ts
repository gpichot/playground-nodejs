import io from "socket.io";
import { bus } from "./bus";
import type { Server } from "http";
import { Request, Response, NextFunction } from "express";

import sessionMiddleware from "./session";

const CLIENT_URL = process.env.CLIENT_URL ?? "http://localhost:3000";

export function initWebsocket(httpServer: Server) {
  const server = new io.Server(httpServer, {
    cors: {
      origin: CLIENT_URL,
      methods: ["GET", "POST"],
      credentials: true,
    },
    serveClient: false,
  });

  server.use((socket, next) => {
    sessionMiddleware(
      socket.request as Request,
      {} as Response,
      next as NextFunction
    );
  });

  server.on("connection", (socket) => {
    const user = (socket.request as any).session?.passport?.user;
    const username = user?.username ?? "anonymous";
    server.emit("newUser", `${username} connected`);
    socket.on("disconnect", () => {
      server.emit("newUser", `${username} disconnected`);
    });
    socket.on("message", (msg) => {
      console.log(msg);
      socket.emit("message", { username, message: "hello world" });
    });
  });

  bus.on("newMessage", (message) => {
    server.emit("message", message);
  });

  return server;
}
