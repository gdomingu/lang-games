"use client";

import { Box, Button, TextField, Card } from "@mui/material";
import { indigo, lightGreen, blue, green, purple } from "@mui/material/colors";
import { keyframes } from "@mui/system";
import WordList from "./WordsList";
import { useState } from "react";

interface Props {
  squareGrid: string[][];
  setSquareGrid: (squareGrid: string[][]) => void;
  word: string;
  setWord: (word: string) => void;
  words: string[];
  setWords: (words: string[]) => void;
  pressedTiles: number[][];
  setPressedTiles: (pressedTiles: number[][]) => void;
  errMessage: string;
  setErrMessage: (message: string) => void;
}

export default function BoggleCards(props: Props) {
  const {
    squareGrid,
    setSquareGrid,
    words,
    setWords,
    word,
    setWord,
    pressedTiles,
    setPressedTiles,
    errMessage,
    setErrMessage,
  } = props;

  const [rotate, setRotate] = useState<boolean>(false);

  function createWord(char: string, location: number[]) {
    if (invalidTileTapped(location))
      return handleError("Tile already selected!");

    setWord(word + char);
    const pressed = [...pressedTiles, location];
    setPressedTiles(pressed);

    if (pressedTiles.length > 0 && doubleTapped(location)) return submitWord();
  }

  function doubleTapped(location: number[]) {
    const lastPressedTileIndex = pressedTiles.length - 1;
    const lastPressedTile = pressedTiles[lastPressedTileIndex];

    return (
      lastPressedTile[0] === location[0] && lastPressedTile[1] === location[1]
    );
  }

  function submitWord() {
    if (words.includes(word)) return handleError("Already guessed!");

    const newWords = [...words, word];
    setWords(newWords);
    resetWord();
  }

  function resetWord() {
    setWord("");
    setPressedTiles([]);
  }

  function tileSelected(i: number, j: number) {
    return pressedTiles?.some((tile) => tile[0] === i && tile[1] === j);
  }

  function invalidTileTapped(location: number[]) {
    return (
      pressedTiles.length > 0 &&
      !doubleTapped(location) &&
      tileSelected(location[0], location[1])
    );
  }

  function handleError(errMessage: string) {
    setErrMessage(errMessage);
    setWord("");

    // delay for Snackbar autoHideDuration
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
    let newGrid: string[][] = [];
    for (let i = 0; i < 4; i++) {
      let newRow: string[] = [];
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

  return (
    <>
      <Box sx={{ display: "flex", margin: "auto" }}>
        <Card
          sx={{
            margin: 2,
            padding: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box>
            <Box
              sx={{
                margin: "auto",
                marginBottom: 2,
                height: "100%",
                display: "flex",
              }}
            >
              <Button
                sx={{
                  color: "#fff",
                  height: 56,
                  width: 160,
                  backgroundColor: blue[500],
                  "&:hover": {
                    backgroundColor: blue[700],
                  },
                }}
                onClick={resetWord}
              >
                Clear
              </Button>
              <TextField
                id="outlined-basic"
                variant="outlined"
                disabled
                defaultValue={word}
                sx={{ marginRight: 2, marginLeft: 2, width: 220 }}
              />
              <Box sx={{ display: "flex" }}>
                <Button
                  sx={{
                    color: "#fff",
                    height: 56,
                    backgroundColor: lightGreen[500],
                    "&:hover": {
                      backgroundColor: lightGreen[700],
                    },
                  }}
                  onClick={submitWord}
                >
                  Submit
                </Button>
                <Button
                  sx={{
                    color: "#fff",
                    marginLeft: 2,
                    height: 56,
                    backgroundColor: purple[500],
                    "&:hover": {
                      backgroundColor: purple[700],
                    },
                  }}
                  onClick={handleRotateBoard}
                >
                  Rotate
                </Button>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              bgcolor: "#eeeeee",
              height: 400,
              width: 400,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              animation: rotate ? `${rotateBoard} 0.8s ease` : null,
            }}
          >
            {squareGrid.map((row, i) => {
              return (
                <Box
                  key={i}
                  sx={{ display: "flex", justifyContent: "space-evenly" }}
                >
                  {row.map((char, j) => {
                    return (
                      <Button
                        onClick={() => createWord(char, [i, j])}
                        key={`${i}-${j}`}
                        sx={{
                          fontSize: 24,
                          fontWeight: 600,
                          width: 65,
                          height: 65,
                          color: "#fff",
                          boxShadow: "5px 5px 5px 2px rgba(0,0,0,0.2)",
                          backgroundColor: tileSelected(i, j)
                            ? green[400]
                            : indigo[400],
                          "&:hover": {
                            backgroundColor: tileSelected(i, j)
                              ? green[400]
                              : indigo[600],
                          },
                          animation:
                            !!errMessage && tileSelected(i, j)
                              ? `${shake} 0.5s infinite ease`
                              : rotate
                              ? `${rotateTile} 0.8s ease`
                              : "none",
                        }}
                      >
                        {char}
                      </Button>
                    );
                  })}
                </Box>
              );
            })}
          </Box>
        </Card>
        <WordList words={words} setWords={setWords} />
      </Box>
    </>
  );
}
