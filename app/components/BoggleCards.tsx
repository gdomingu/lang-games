"use client";

import { Box, Button, TextField, Card } from "@mui/material";
import { indigo, lightGreen, blue, green } from "@mui/material/colors";
import { keyframes } from "@mui/system";
import WordList from "./WordsList";

interface Props {
  squareGrid: string[][];
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
    words,
    setWords,
    word,
    setWord,
    pressedTiles,
    setPressedTiles,
    errMessage,
    setErrMessage,
  } = props;

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

  const shake = keyframes`
    from {
      transform: rotate(-3deg);
    }
    to {
      transform: rotate(3deg);
    }
  `;

  return (
    <>
      <Box sx={{ display: "flex", margin: "auto" }}>
        <Card sx={{ margin: 2, padding: 3 }}>
          <Box sx={{ display: "flex" }}>
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
                sx={{ marginRight: 2, marginLeft: 2 }}
              />

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
            </Box>
          </Box>
          <Box
            sx={{
              bgcolor: "#E7C8DD",
              height: 400,
              width: 400,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
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
                              : null,
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
