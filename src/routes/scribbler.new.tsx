import {createFileRoute} from "@tanstack/react-router";
import {useEffect, useState} from "react";
import DrawingCanvas from "../components/DrawingCanvas";

export const Route = createFileRoute("/scribbler/new")({component: NewGame});

function NewGame() {
  const [roomCode, setRoomCode] = useState("");

  useEffect(() => setRoomCode(Math.random().toString(36).substring(2, 8)), []);

  const joinUrl = roomCode ? `${window.location.origin}/scribbler/join?roomCode=${roomCode}` : "";
  return (
    <>
      <p>Join game with this URL: {joinUrl}</p>
      {roomCode && <DrawingCanvas roomCode={roomCode} />}
    </>
  );
}