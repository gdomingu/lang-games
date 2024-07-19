"use client";
// import {socket} from "@/app/socket";
import {Box} from "@mui/material";
import {useSearchParams} from "next/navigation";
import {useEffect, useRef, useState} from "react";
import {io} from "socket.io-client";

export default function GuessingCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [color, setColor] = useState("black");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const width = parent.offsetWidth;
    const height = parent.offsetHeight;
    // Set the canvas size here instead of on the element below to avoid css rules from messing up cursor position
    canvas.width = width * 2; // High DPI screen support
    canvas.height = height * 2;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    canvas.style.display = "block";

    const context = canvas?.getContext("2d");
    if (!context) return;
    context.scale(2, 2); // Adjust for High DPI screens
    context.lineCap = "round";
    context.strokeStyle = color;
    context.lineWidth = 5;
  }, []);

  useEffect(() => {
    const context = canvasRef.current?.getContext("2d");
    if (!context) return;
    context.strokeStyle = color;

    socket.emit("style-change", roomCode, {color});
  }, [color]);

  const socket = io();

  const roomCode = useSearchParams().get("roomCode");

  useEffect(() => {
    socket.emit("join-room", roomCode);

    socket.on("draw-start", (value: {x: number; y: number}) => {
      startDrawing({offsetX: value.x, offsetY: value.y});
    });

    socket.on("draw", (value: {x: number; y: number}) => {
      const {x, y} = value;
      draw({offsetX: x, offsetY: y});
    });

    socket.on("draw-stop", () => {
      stopDrawing();
    });

    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    // Listen for connection errors
    socket.on("connect_error", error => {
      console.error("Connection error:", error);
    });

    socket.on("style-change", (value: {color: string}) => {
      setColor(value.color);
    });

    // Cleanup on component unmount
    return () => {
      socket.off("connect");
    };
  }, []);

  const startDrawing = ({offsetX, offsetY}: {offsetX: number; offsetY: number}) => {
    const context = canvasRef.current?.getContext("2d");
    context?.beginPath();
    context?.moveTo(offsetX, offsetY);
  };

  const draw = ({offsetX, offsetY}: {offsetX: number; offsetY: number}) => {
    const context = canvasRef.current?.getContext("2d");
    context?.lineTo(offsetX, offsetY);
    context?.stroke();
  };

  const stopDrawing = () => {
    const context = canvasRef.current?.getContext("2d");
    context?.closePath();
  };

  return (
    <>
      <Box sx={{height: "70vh"}}>
        <canvas
          ref={canvasRef}
          style={{
            border: "1px solid black",
            backgroundColor: "white",
            touchAction: "none",
            display: "none",
          }}
        />
      </Box>
    </>
  );
}
