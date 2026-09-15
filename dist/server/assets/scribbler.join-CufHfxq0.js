import { n as Route } from "./router-DWjFMxj8.js";
import { t as getSocket } from "./socket-CL4QB6e7.js";
import { useEffect, useRef, useState } from "react";
import { Fragment, jsx } from "react/jsx-runtime";
import { Box } from "@mui/material";
//#region src/components/GuessingCanvas.tsx
function GuessingCanvas({ roomCode }) {
	const canvasRef = useRef(null);
	const [color, setColor] = useState("black");
	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const parent = canvas.parentElement;
		if (!parent) return;
		const width = parent.offsetWidth;
		const height = parent.offsetHeight;
		canvas.width = width * 2;
		canvas.height = height * 2;
		canvas.style.width = `${width}px`;
		canvas.style.height = `${height}px`;
		canvas.style.display = "block";
		const context = canvas?.getContext("2d");
		if (!context) return;
		context.scale(2, 2);
		context.lineCap = "round";
		context.strokeStyle = color;
		context.lineWidth = 5;
	}, []);
	useEffect(() => {
		const context = canvasRef.current?.getContext("2d");
		if (!context) return;
		context.strokeStyle = color;
		socket.emit("style-change", roomCode, { color });
	}, [color]);
	const socket = getSocket();
	useEffect(() => {
		socket.emit("join-room", roomCode);
		socket.on("draw-start", (value) => {
			startDrawing({
				offsetX: value.x,
				offsetY: value.y
			});
		});
		socket.on("draw", (value) => {
			const { x, y } = value;
			draw({
				offsetX: x,
				offsetY: y
			});
		});
		socket.on("draw-stop", () => {
			stopDrawing();
		});
		socket.on("connect", () => {
			console.log("Connected to WebSocket server");
		});
		socket.on("connect_error", (error) => {
			console.error("Connection error:", error);
		});
		socket.on("style-change", (value) => {
			setColor(value.color);
		});
		return () => {
			socket.off("connect");
		};
	}, []);
	const startDrawing = ({ offsetX, offsetY }) => {
		const context = canvasRef.current?.getContext("2d");
		context?.beginPath();
		context?.moveTo(offsetX, offsetY);
	};
	const draw = ({ offsetX, offsetY }) => {
		const context = canvasRef.current?.getContext("2d");
		context?.lineTo(offsetX, offsetY);
		context?.stroke();
	};
	const stopDrawing = () => {
		(canvasRef.current?.getContext("2d"))?.closePath();
	};
	return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(Box, {
		sx: { height: "70vh" },
		children: /* @__PURE__ */ jsx("canvas", {
			ref: canvasRef,
			style: {
				border: "1px solid black",
				backgroundColor: "white",
				touchAction: "none",
				display: "none"
			}
		})
	}) });
}
//#endregion
//#region src/routes/scribbler.join.tsx?tsr-split=component
function JoinGame() {
	const { roomCode } = Route.useSearch();
	return roomCode ? /* @__PURE__ */ jsx(GuessingCanvas, { roomCode }) : /* @__PURE__ */ jsx("p", { children: "A room code is required." });
}
//#endregion
export { JoinGame as component };
