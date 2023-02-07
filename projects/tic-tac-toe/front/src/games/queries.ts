import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

const baseUrl = "http://localhost:3000";

const PlayerSchema = z.enum(["X", "O", ""]);
const RowSchema = z.tuple([PlayerSchema, PlayerSchema, PlayerSchema]);
const BoardSchema = z.tuple([RowSchema, RowSchema, RowSchema]);
const GameSchema = z.object({
  _id: z.string(),
  board: BoardSchema,
  winner: z.string().optional().nullable().default(null),
  isOver: z.boolean().optional().default(false),
});

export type Game = z.infer<typeof GameSchema>;

const GameListSchema = z.array(
  z.object({
    _id: z.string(),
    winner: z.string().optional().nullable(),
    isOver: z.boolean().optional().default(false),
  })
);

export function useGameListQuery() {
  return useQuery(
    ["games"],
    async () => {
      const response = await fetch(`${baseUrl}/games`);

      if (!response.ok) throw new Error("Failed to fetch games");
      return GameListSchema.parse(await response.json());
    },
    {
      refetchOnWindowFocus: false,
    }
  );
}

export function useGameQuery(gameId: string | undefined) {
  return useQuery(
    ["game", gameId],
    async () => {
      const response = await fetch(`${baseUrl}/games/${gameId}`);

      if (!response.ok) throw new Error("Failed to fetch game");
      return GameSchema.parse(await response.json());
    },
    {
      refetchOnWindowFocus: false,
      enabled: Boolean(gameId),
    }
  );
}

export function useMoveMutation(gameId: string | undefined) {
  const queryClient = useQueryClient();
  return useMutation(
    ["move", gameId],
    async (move: { x: number; y: number }) => {
      const response = await fetch(`${baseUrl}/games/${gameId}/move`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(move),
      });

      if (!response.ok) throw new Error("Failed to move");
      return GameSchema.parse(await response.json());
    },
    {
      onSuccess: (data) => {
        queryClient.setQueryData(["game", gameId], data);
      },
    }
  );
}

export function useCreateGameMutation() {
  const queryClient = useQueryClient();
  return useMutation(
    ["createGame"],
    async () => {
      const response = await fetch(`${baseUrl}/games`, {
        method: "POST",
      });

      if (!response.ok) throw new Error("Failed to create game");
      return GameSchema.parse(await response.json());
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["games"]);
        queryClient.setQueryData(["game", data._id], data);
      },
    }
  );
}
