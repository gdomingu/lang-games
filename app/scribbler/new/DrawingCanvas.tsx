"use client";
import {Box} from "@mui/material";
import {useEffect, useRef, useState} from "react";

export default function DrawingCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

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
    // canvas.style.backgroundColor = "white";
    // canvas.style.border = "1px solid black";

    const context = canvas?.getContext("2d");
    if (!context) return;
    context.scale(2, 2); // Adjust for High DPI screens
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 5;
  }, []);

  const startDrawing = ({nativeEvent}: React.MouseEvent<HTMLCanvasElement>) => {
    const {offsetX, offsetY} = nativeEvent;
    const context = canvasRef.current?.getContext("2d");
    context?.beginPath();
    context?.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = ({nativeEvent}: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const {offsetX, offsetY} = nativeEvent;
    const context = canvasRef.current?.getContext("2d");
    context?.lineTo(offsetX, offsetY);
    context?.stroke();
  };

  const stopDrawing = () => {
    const context = canvasRef.current?.getContext("2d");
    context?.closePath();
    setIsDrawing(false);
  };

  return (
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
          // touchAction: "none",
          cursor: "crosshair",
        }}
      />
    </Box>
  );
}
