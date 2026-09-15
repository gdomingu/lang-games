import {createFileRoute} from "@tanstack/react-router";
import GuessingCanvas from "../components/GuessingCanvas";

export const Route = createFileRoute("/scribbler/join")({
  validateSearch: (search: Record<string, unknown>) => ({
    roomCode: typeof search.roomCode === "string" ? search.roomCode : "",
  }),
  component: JoinGame,
});

function JoinGame() {
  const {roomCode} = Route.useSearch();
  return roomCode ? <GuessingCanvas roomCode={roomCode} /> : <p>A room code is required.</p>;
}