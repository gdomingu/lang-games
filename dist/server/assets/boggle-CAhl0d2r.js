import { useEffect, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { Box, Button, Card, IconButton, Snackbar, TextField } from "@mui/material";
import { blue, green, indigo, lightGreen, orange, purple } from "@mui/material/colors/index.js";
import { keyframes } from "@mui/system";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined.js";
//#region src/components/WordsList.tsx
function WordList(props) {
	const { words, setWords } = props;
	function removeWord(wordToRemove) {
		const filteredWords = words.filter((word) => word !== wordToRemove);
		setWords(filteredWords);
	}
	return /* @__PURE__ */ jsx(Card, {
		sx: {
			margin: 2,
			padding: 3
		},
		children: /* @__PURE__ */ jsx(Box, {
			sx: {
				bgcolor: "#eeeeee",
				borderRadius: "4px",
				height: "100%",
				maxHeight: "472px",
				width: 200,
				margin: "auto",
				overflowY: "scroll"
			},
			children: words?.length > 0 && words.map((word, i) => {
				return /* @__PURE__ */ jsxs(Box, {
					sx: {
						color: "#424242",
						fontWeight: 600,
						width: "100%",
						marginTop: 2,
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center"
					},
					children: [/* @__PURE__ */ jsx(Box, {
						sx: { marginLeft: 2 },
						children: word
					}), /* @__PURE__ */ jsx(Box, {
						sx: { marginRight: 1 },
						children: /* @__PURE__ */ jsx(IconButton, {
							onClick: () => removeWord(word),
							children: /* @__PURE__ */ jsx(DeleteOutlinedIcon, {})
						})
					})]
				}, i);
			})
		})
	});
}
//#endregion
//#region src/components/BoggleCards.tsx
function BoggleCards(props) {
	const { squareGrid, setSquareGrid, words, setWords, word, setWord, pressedTiles, setPressedTiles, errMessage, setErrMessage } = props;
	const [rotate, setRotate] = useState(false);
	function createWord(char, location) {
		if (invalidTileTapped(location)) return handleError("Tile already selected!");
		setWord(word + char);
		const pressed = [...pressedTiles, location];
		setPressedTiles(pressed);
		if (pressedTiles.length > 0 && doubleTapped(location)) return submitWord();
	}
	function doubleTapped(location) {
		const lastPressedTileIndex = pressedTiles.length - 1;
		const lastPressedTile = pressedTiles[lastPressedTileIndex];
		return lastPressedTile[0] === location[0] && lastPressedTile[1] === location[1];
	}
	function submitWord() {
		if (!word) return handleError("Please select letters!");
		if (words.includes(word)) return handleError("Already guessed!");
		const newWords = [...words, word];
		setWords(newWords);
		resetWord();
	}
	function resetWord() {
		setWord("");
		setPressedTiles([]);
	}
	function tileSelected(i, j) {
		return pressedTiles?.some((tile) => tile[0] === i && tile[1] === j);
	}
	function invalidTileTapped(location) {
		return pressedTiles.length > 0 && !doubleTapped(location) && tileSelected(location[0], location[1]);
	}
	function handleError(errMessage) {
		setErrMessage(errMessage);
		setWord("");
		setTimeout(() => {
			setPressedTiles([]);
		}, 1500);
	}
	function handleRotateBoard() {
		resetWord();
		setRotate(true);
		setTimeout(() => {
			newBoardAfterRotate();
			setRotate(false);
		}, 800);
	}
	function newBoardAfterRotate() {
		let newGrid = [];
		for (let i = 0; i < 4; i++) {
			let newRow = [];
			for (let j = 3; j >= 0; j--) {
				const char = squareGrid[j][i];
				newRow.push(char);
			}
			newGrid.push(newRow);
		}
		setSquareGrid(newGrid);
	}
	const shake = keyframes`
    from {
      transform: rotate(-3deg);
    }
    to {
      transform: rotate(3deg);
    }
  `;
	const rotateBoard = keyframes`
    from {
      transform: rotate(0deg);
    } to {
      transform: rotate(90deg);
    }
  `;
	const rotateTile = keyframes`
    from {
      transform: rotate(0deg);
    } to {
      transform: rotate(-90deg);
    }
  `;
	return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(Box, {
		sx: {
			display: "flex",
			margin: "auto"
		},
		children: [/* @__PURE__ */ jsxs(Card, {
			sx: {
				margin: 2,
				padding: 3,
				display: "flex",
				flexDirection: "column",
				alignItems: "center"
			},
			children: [/* @__PURE__ */ jsx(Box, { children: /* @__PURE__ */ jsxs(Box, {
				sx: {
					margin: "auto",
					marginBottom: 2,
					height: "100%",
					display: "flex"
				},
				children: [
					/* @__PURE__ */ jsx(Button, {
						sx: {
							color: "#fff",
							height: 56,
							width: 160,
							backgroundColor: blue[500],
							"&:hover": { backgroundColor: blue[700] }
						},
						onClick: resetWord,
						children: "Clear"
					}),
					/* @__PURE__ */ jsx(TextField, {
						id: "outlined-basic",
						variant: "outlined",
						disabled: true,
						defaultValue: word,
						sx: {
							marginRight: 2,
							marginLeft: 2,
							width: 220
						}
					}),
					/* @__PURE__ */ jsxs(Box, {
						sx: { display: "flex" },
						children: [/* @__PURE__ */ jsx(Button, {
							sx: {
								color: "#fff",
								height: 56,
								backgroundColor: lightGreen[500],
								"&:hover": { backgroundColor: lightGreen[700] }
							},
							onClick: submitWord,
							children: "Submit"
						}), /* @__PURE__ */ jsx(Button, {
							sx: {
								color: "#fff",
								marginLeft: 2,
								height: 56,
								backgroundColor: purple[500],
								"&:hover": { backgroundColor: purple[700] }
							},
							onClick: handleRotateBoard,
							children: "Rotate"
						})]
					})
				]
			}) }), /* @__PURE__ */ jsx(Box, {
				sx: {
					bgcolor: "#eeeeee",
					height: 400,
					width: 400,
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-evenly",
					animation: rotate ? `${rotateBoard} 0.8s ease` : null
				},
				children: squareGrid.map((row, i) => {
					return /* @__PURE__ */ jsx(Box, {
						sx: {
							display: "flex",
							justifyContent: "space-evenly"
						},
						children: row.map((char, j) => {
							return /* @__PURE__ */ jsx(Button, {
								onClick: () => createWord(char, [i, j]),
								sx: {
									fontSize: 24,
									fontWeight: 600,
									width: 65,
									height: 65,
									color: "#fff",
									boxShadow: "5px 5px 5px 2px rgba(0,0,0,0.2)",
									backgroundColor: tileSelected(i, j) ? green[400] : indigo[400],
									"&:hover": { backgroundColor: tileSelected(i, j) ? green[400] : indigo[600] },
									animation: !!errMessage && tileSelected(i, j) ? `${shake} 0.5s infinite ease` : rotate ? `${rotateTile} 0.8s ease` : "none"
								},
								children: char
							}, `${i}-${j}`);
						})
					}, i);
				})
			})]
		}), /* @__PURE__ */ jsx(WordList, {
			words,
			setWords
		})]
	}) });
}
//#endregion
//#region src/routes/boggle.tsx?tsr-split=component
function Boggle() {
	const [squareGrid, setSquareGrid] = useState([]);
	const [word, setWord] = useState("");
	const [words, setWords] = useState([]);
	const [pressedTiles, setPressedTiles] = useState([]);
	const [errMessage, setErrMessage] = useState("");
	function generate() {
		const chars = "abcdefghijklmnopqrstuvwxyz";
		setWord("");
		setWords([]);
		setPressedTiles([]);
		setSquareGrid(Array.from({ length: 4 }, () => Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * 26)])));
	}
	useEffect(generate, []);
	return squareGrid.length ? /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsxs(Box, {
			sx: {
				display: "flex",
				flexDirection: "column",
				alignItems: "center"
			},
			children: [/* @__PURE__ */ jsx("h2", { children: "Boggle" }), /* @__PURE__ */ jsx(Button, {
				onClick: generate,
				variant: "contained",
				sx: {
					color: "#fff",
					bgcolor: orange[500]
				},
				children: "Shuffle"
			})]
		}),
		/* @__PURE__ */ jsx(Box, {
			sx: { display: "flex" },
			children: /* @__PURE__ */ jsx(BoggleCards, {
				squareGrid,
				setSquareGrid,
				words,
				setWords,
				word,
				setWord,
				pressedTiles,
				setPressedTiles,
				errMessage,
				setErrMessage
			})
		}),
		/* @__PURE__ */ jsx(Snackbar, {
			open: !!errMessage,
			autoHideDuration: 2e3,
			onClose: () => setErrMessage(""),
			message: errMessage
		})
	] }) : null;
}
//#endregion
export { Boggle as component };
