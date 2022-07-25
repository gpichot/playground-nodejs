import React from "react";
import { io, Socket } from "socket.io-client";

import { API_URL } from "./interface";

export const WebsocketContext = React.createContext<Socket | null>(null);

const socket = io(API_URL, {
  withCredentials: true,
});
socket.on("error", (error) => {
  console.error("Unable to connect socket.io", error);
});
export function WebsocketProvider({ children }: { children: React.ReactNode }) {
  return (
    <WebsocketContext.Provider value={socket}>
      {children}
    </WebsocketContext.Provider>
  );
}

export function useWebsocket() {
  const socket = React.useContext(WebsocketContext);
  if (!socket) {
    throw new Error("useWebsocket must be used within a WebsocketProvider");
  }
  return socket;
}
