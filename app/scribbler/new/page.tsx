"use client";
import {useEffect, useState} from "react";
import DrawingCanvas from "./DrawingCanvas";

export default function Page() {
  const [joinUrl, setJoinUrl] = useState("");
  const roomCode = Math.random().toString(36).substring(2, 8);

  useEffect(() => {
    // This code runs only on the client side
    const url = `${window.location.origin}/scribbler/join?roomCode=${roomCode}`;
    setJoinUrl(url);
  }, []);

  return (
    <>
      <p>Join game with this URL: {joinUrl}</p>
      <DrawingCanvas roomCode={roomCode} />
    </>
  );
}
