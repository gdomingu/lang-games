import { useState } from "react";
import { Link, Outlet, useMatchRoute, useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { Box, Button, TextField } from "@mui/material";
import { lightBlue, lightGreen } from "@mui/material/colors/index.js";
//#region src/components/JoinGame.tsx
function JoinGame() {
	const [gameCode, setGameCode] = useState("");
	const navigate = useNavigate();
	const joinGame = (event) => {
		event.preventDefault();
		const roomCode = gameCode.trim();
		if (roomCode) navigate({
			to: "/scribbler/join",
			search: { roomCode }
		});
	};
	return /* @__PURE__ */ jsxs("form", {
		onSubmit: joinGame,
		children: [/* @__PURE__ */ jsxs("label", { children: ["Game code:", /* @__PURE__ */ jsx(TextField, {
			id: "outlined-basic",
			variant: "outlined",
			placeholder: "Enter game code",
			sx: {
				marginRight: 2,
				marginLeft: 2,
				width: 220
			},
			onChange: (e) => setGameCode(e.target.value)
		})] }), /* @__PURE__ */ jsx(Button, {
			sx: {
				color: "#fff",
				height: 56,
				backgroundColor: lightGreen[500],
				"&:hover": { backgroundColor: lightGreen[700] }
			},
			type: "submit",
			children: "Join Game"
		})]
	});
}
//#endregion
//#region src/routes/scribbler.tsx?tsr-split=component
function ScribblerLayout() {
	if (!useMatchRoute()({
		to: "/scribbler",
		fuzzy: false
	})) return /* @__PURE__ */ jsx(Outlet, {});
	return /* @__PURE__ */ jsxs(Box, {
		sx: {
			display: "flex",
			flexDirection: "column",
			alignItems: "center"
		},
		children: [
			/* @__PURE__ */ jsx("h1", { children: "Scribbler" }),
			/* @__PURE__ */ jsx(JoinGame, {}),
			/* @__PURE__ */ jsxs(Box, {
				sx: {
					marginTop: 4,
					textAlign: "center"
				},
				children: [/* @__PURE__ */ jsx("p", { children: "Or create a new game" }), /* @__PURE__ */ jsx(Link, {
					to: "/scribbler/new",
					children: /* @__PURE__ */ jsx(Button, {
						sx: {
							color: "#fff",
							height: 56,
							bgcolor: lightBlue[500]
						},
						children: "New Game"
					})
				})]
			})
		]
	});
}
//#endregion
export { ScribblerLayout as component };
