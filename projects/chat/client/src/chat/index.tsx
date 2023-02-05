import React from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchApiMessages, postApiMessage } from "src/interface";
import { useWebsocket } from "src/websocket";
type Message = {
  id: string;
  username: string;
  text: string;
};

export function RoomPage() {
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get("room");
  const messagesQuery = useMessageList(roomId || "main");
  if (messagesQuery.isLoading) {
    return <div>Loading...</div>;
  }
  if (messagesQuery.isError) {
    return <div>Error</div>;
  }
  const { data: messages } = messagesQuery;
  return (
    <>
      <MessageList messages={messages} />
      <MessageForm room={roomId || "main"} onSubmit={messagesQuery.refetch} />
    </>
  );
}

function useMessageList(room: string) {
  const queryClient = useQueryClient();
  const messagesQuery = useQuery(["messages", room], () =>
    fetchApiMessages(room)
  );

  const ws = useWebsocket();
  React.useEffect(() => {
    const handleNewMessage = (message: Message) => {
      console.log(message);
      queryClient.setQueryData(["messages", room], (data) => {
        const messages = Array.isArray(data) ? (data as Message[]) : [];
        return [...messages, message];
      });
    };
    ws.on("message", handleNewMessage);
    return () => {
      ws.removeListener("message", handleNewMessage);
    };
  }, [ws, queryClient, room]);

  return messagesQuery;
}

function useAddMessageMutation(room: string) {
  const [isSending, setIsSending] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  const addMessage = React.useCallback(
    async (text: string) => {
      setIsSending(true);
      setError(null);
      try {
        await postApiMessage(room, text);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsSending(false);
      }
    },
    [room]
  );

  return { addMessage, isSending, error };
}

function MessageList({ messages }: { messages: Message[] }) {
  return (
    <div>
      {messages.map((message) => (
        <MessageRow key={message.id} message={message} />
      ))}
    </div>
  );
}

function MessageRow({ message }: { message: Message }) {
  return (
    <div>
      {message.username}: {message.text}
    </div>
  );
}

function MessageForm({
  room,
  onSubmit,
}: {
  room: string;
  onSubmit: () => void;
}) {
  const [text, setText] = React.useState("");

  const mutation = useAddMessageMutation(room);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.addMessage(text).then(() => {
      setText("");
      onSubmit();
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit" disabled={mutation.isSending}>
        Send
      </button>
    </form>
  );
}
