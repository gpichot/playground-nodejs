import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { io, Socket } from "socket.io-client";

import { Game } from "./queries";

export type SocketContextType = {
  socket: Socket | null;
  isConnected: boolean;
  isConnecting: boolean;
};
export const SocketContext = React.createContext<SocketContextType | null>(
  null
);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  React.useEffect(() => {
    setIsConnecting(true);
    const newSocket = io("http://localhost:3000", {
      transports: ["websocket"],
    });

    setSocket(newSocket);

    newSocket.on("connect", () => {
      setIsConnected(true);
      setIsConnecting(false);
    });

    newSocket.on("disconnect", () => {
      setIsConnected(false);
    });

    return () => {
      newSocket.close();
    };
  }, []);

  const context = React.useMemo(() => {
    return { socket, isConnected, isConnecting };
  }, [socket, isConnected, isConnecting]);

  return (
    <SocketContext.Provider value={context}>{children}</SocketContext.Provider>
  );
};

export function useSocket() {
  const socket = React.useContext(SocketContext);
  const queryClient = useQueryClient();

  React.useEffect(() => {
    if (!socket?.socket) return;

    socket?.socket.on("gameCreated", () => {
      queryClient.invalidateQueries(["games"]);
    });
  }, [socket, queryClient]);

  if (!socket) {
    throw new Error("Socket must be used within a SocketProvider");
  }
  return socket;
}

export function useGameRoom(gameId: string) {
  const { socket, isConnected } = useSocket();

  const queryClient = useQueryClient();

  React.useEffect(() => {
    if (!socket) return;

    socket.emit("joinGame", gameId);

    socket.on("gameMove", (game: string) => {
      const gameParsed = JSON.parse(game) as {
        board: string[][];
        winner: string | null;
      };
      queryClient.setQueryData(["game", gameId], gameParsed);
    });

    return () => {
      socket.emit("leaveGame", gameId);
    };
  }, [socket, isConnected, gameId, queryClient]);
}
