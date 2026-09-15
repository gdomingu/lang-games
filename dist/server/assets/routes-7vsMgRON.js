import { Link } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { Box, Button, Card, CardActions, CardContent, CardMedia, Stack, Typography } from "@mui/material";
//#region src/components/GameCards.tsx
function MediaCard() {
	return /* @__PURE__ */ jsx(Stack, {
		direction: "row",
		spacing: 2,
		children: [{
			title: "Scribbler",
			description: "A game where you draw and guess the word. You can upload your own word list.",
			image: "../pictionary-placeholder.jpg",
			link: "/scribbler"
		}, {
			title: "Boggle",
			description: "A game where you find words in a grid of letters. You can choose your alphabet and letter distribution.",
			image: "../boggle-placeholder.jpg",
			link: "/boggle"
		}].map((card, index) => {
			return /* @__PURE__ */ jsxs(Card, {
				sx: {
					maxWidth: 345,
					display: "flex",
					flexDirection: "column"
				},
				children: [/* @__PURE__ */ jsxs(Box, {
					sx: { flexGrow: 1 },
					children: [/* @__PURE__ */ jsx(CardMedia, {
						sx: { height: 140 },
						image: card.image,
						title: card.title
					}), /* @__PURE__ */ jsxs(CardContent, { children: [/* @__PURE__ */ jsx(Typography, {
						gutterBottom: true,
						variant: "h5",
						component: "div",
						children: card.title
					}), /* @__PURE__ */ jsx(Typography, {
						variant: "body2",
						color: "text.secondary",
						children: card.description
					})] })]
				}), /* @__PURE__ */ jsx(CardActions, { children: /* @__PURE__ */ jsx(Link, {
					to: card.link,
					children: /* @__PURE__ */ jsxs(Button, {
						size: "small",
						children: ["Play ", card.title]
					})
				}) })]
			}, index);
		})
	});
}
//#endregion
//#region src/routes/index.tsx?tsr-split=component
function Home() {
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs(Box, {
		sx: {
			width: "100%",
			maxWidth: 500,
			marginBottom: 4
		},
		children: [
			/* @__PURE__ */ jsx(Typography, {
				variant: "h2",
				children: "Language Games"
			}),
			/* @__PURE__ */ jsx(Typography, {
				variant: "subtitle1",
				sx: { marginY: 3 },
				children: "A site for playing games in different languages."
			}),
			/* @__PURE__ */ jsx(Typography, {
				variant: "body1",
				children: "Grab your friends and family, and play games over Zoom together. Every game aims to be customizable to your language, without ads."
			})
		]
	}), /* @__PURE__ */ jsx(MediaCard, {})] });
}
//#endregion
export { Home as component };
