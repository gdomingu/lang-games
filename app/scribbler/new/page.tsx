"use client";
import DrawingCanvas from "./DrawingCanvas";

export default function Page() {
  const roomCode = Math.random().toString(36).substring(2, 8);

  return (
    <>
      <p>Join game with this URL: {`${window?.location?.origin}/scribbler/join?roomCode=${roomCode}`}</p>
      <DrawingCanvas roomCode={roomCode} />;
    </>
  );
}
