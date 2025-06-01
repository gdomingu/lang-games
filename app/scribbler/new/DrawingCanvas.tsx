"use client";
import DeleteIcon from "@mui/icons-material/Delete";
import {Box, IconButton} from "@mui/material";
import {useEffect, useRef, useState} from "react";
import {io} from "socket.io-client";
import ColorPicker from "./ColorPicker";

export default function DrawingCanvas({roomCode}: {roomCode: string}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#000000");

  const socket = io();

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

  useEffect(() => {
    socket.emit("join-room", roomCode);

    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    // Listen for connection errors
    socket.on("connect_error", error => {
      console.error("Connection error:", error);
    });

    // Cleanup on component unmount
    return () => {
      socket.off("connect");
    };
  }, []);

  const startDrawing = ({nativeEvent}: React.MouseEvent<HTMLCanvasElement>) => {
    const {offsetX, offsetY} = nativeEvent;
    const context = canvasRef.current?.getContext("2d");
    context?.beginPath();
    context?.moveTo(offsetX, offsetY);
    setIsDrawing(true);
    socket.emit("draw-start", roomCode, {x: offsetX, y: offsetY});
  };

  const draw = ({nativeEvent}: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const {offsetX, offsetY} = nativeEvent;
    const context = canvasRef.current?.getContext("2d");
    context?.lineTo(offsetX, offsetY);
    context?.stroke();
    socket.emit("draw", roomCode, {x: offsetX, y: offsetY});
  };

  const stopDrawing = () => {
    const context = canvasRef.current?.getContext("2d");
    context?.closePath();
    setIsDrawing(false);
    socket.emit("draw-stop", roomCode);
  };

  const ClearButton = () => {
    return (
      <IconButton
        onClick={() => {
          const context = canvasRef.current?.getContext("2d");
          if (context) {
            context.clearRect(0, 0, canvasRef.current?.width || 0, canvasRef.current?.height || 0);
          }
          socket.emit("clear-canvas", roomCode);
        }}
      >
        <DeleteIcon />
      </IconButton>
    );
  };

  return (
    <>
      <Box sx={{height: "70vh"}}>
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseUp={stopDrawing}
          onMouseOut={stopDrawing}
          onMouseMove={draw}
          style={{
            border: "1px solid black",
            backgroundColor: "white",
            touchAction: "none",
            cursor: "crosshair",
            display: "none",
          }}
        />
      </Box>
      <Box marginTop="8px" display="inline-flex" alignItems="center">
        <ColorPicker setColor={setColor}></ColorPicker>
        <ClearButton />
      </Box>
    </>
  );
}
