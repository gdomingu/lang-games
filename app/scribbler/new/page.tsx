"use client";
import {useEffect, useState} from "react";
import DrawingCanvas from "./DrawingCanvas";

export default function Page() {
  const [joinUrl, setJoinUrl] = useState("");
  const [roomCode, setRoomCode] = useState("");

  useEffect(() => {
    // This code runs only on the client side
    const code = Math.random().toString(36).substring(2, 8);
    const url = `${window.location.origin}/scribbler/join?roomCode=${code}`;
    setJoinUrl(url);
    setRoomCode(code); // need to use state for this or code will be differennt between url and params
  }, []);

  return (
    <>
      <p>Join game with this URL: {joinUrl}</p>
      <DrawingCanvas roomCode={roomCode} />
    </>
  );
}
