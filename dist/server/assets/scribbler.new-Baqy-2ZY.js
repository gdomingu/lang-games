import { t as getSocket } from "./socket-CL4QB6e7.js";
import { useEffect, useRef, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete.js";
//#region src/components/ColorPicker.tsx
function ColorPicker({ setColor }) {
	const colors = [
		"#000000",
		"#ffffff",
		"#ff0000",
		"#00ff00",
		"#0000ff",
		"#ffff00",
		"#ff00ff",
		"#00ffff"
	];
	const handleColorChange = (color) => {
		setColor(color);
	};
	return /* @__PURE__ */ jsx("span", { children: colors.map((color) => /* @__PURE__ */ jsx("button", {
		style: {
			backgroundColor: color,
			width: 30,
			height: 30,
			cursor: "pointer"
		},
		onClick: () => handleColorChange(color)
	}, color)) });
}
//#endregion
//#region src/components/DrawingCanvas.tsx
function DrawingCanvas({ roomCode }) {
	const canvasRef = useRef(null);
	const [isDrawing, setIsDrawing] = useState(false);
	const [color, setColor] = useState("#000000");
	const socket = getSocket();
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
	useEffect(() => {
		socket.emit("join-room", roomCode);
		socket.on("connect", () => {
			console.log("Connected to WebSocket server");
		});
		socket.on("connect_error", (error) => {
			console.error("Connection error:", error);
		});
		return () => {
			socket.off("connect");
		};
	}, []);
	const startDrawing = ({ nativeEvent }) => {
		const { offsetX, offsetY } = nativeEvent;
		const context = canvasRef.current?.getContext("2d");
		context?.beginPath();
		context?.moveTo(offsetX, offsetY);
		setIsDrawing(true);
		socket.emit("draw-start", roomCode, {
			x: offsetX,
			y: offsetY
		});
	};
	const draw = ({ nativeEvent }) => {
		if (!isDrawing) return;
		const { offsetX, offsetY } = nativeEvent;
		const context = canvasRef.current?.getContext("2d");
		context?.lineTo(offsetX, offsetY);
		context?.stroke();
		socket.emit("draw", roomCode, {
			x: offsetX,
			y: offsetY
		});
	};
	const stopDrawing = () => {
		(canvasRef.current?.getContext("2d"))?.closePath();
		setIsDrawing(false);
		socket.emit("draw-stop", roomCode);
	};
	const ClearButton = () => {
		return /* @__PURE__ */ jsx(IconButton, {
			onClick: () => {
				const context = canvasRef.current?.getContext("2d");
				if (context) context.clearRect(0, 0, canvasRef.current?.width || 0, canvasRef.current?.height || 0);
				socket.emit("clear-canvas", roomCode);
			},
			children: /* @__PURE__ */ jsx(DeleteIcon, {})
		});
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Box, {
		sx: { height: "70vh" },
		children: /* @__PURE__ */ jsx("canvas", {
			ref: canvasRef,
			onMouseDown: startDrawing,
			onMouseUp: stopDrawing,
			onMouseOut: stopDrawing,
			onMouseMove: draw,
			style: {
				border: "1px solid black",
				backgroundColor: "white",
				touchAction: "none",
				cursor: "crosshair",
				display: "none"
			}
		})
	}), /* @__PURE__ */ jsxs(Box, {
		marginTop: "8px",
		display: "inline-flex",
		alignItems: "center",
		children: [/* @__PURE__ */ jsx(ColorPicker, { setColor }), /* @__PURE__ */ jsx(ClearButton, {})]
	})] });
}
//#endregion
//#region src/routes/scribbler.new.tsx?tsr-split=component
function NewGame() {
	const [roomCode, setRoomCode] = useState("");
	useEffect(() => setRoomCode(Math.random().toString(36).substring(2, 8)), []);
	const joinUrl = roomCode ? `${window.location.origin}/scribbler/join?roomCode=${roomCode}` : "";
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("p", { children: ["Join game with this URL: ", joinUrl] }), roomCode && /* @__PURE__ */ jsx(DrawingCanvas, { roomCode })] });
}
//#endregion
export { NewGame as component };
