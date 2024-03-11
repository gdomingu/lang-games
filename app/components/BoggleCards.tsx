"use client";

import { Box, Button, TextField, Card } from "@mui/material";
import { indigo, lightGreen, blue, green } from "@mui/material/colors";
import { useState } from "react";
import WordList from "./WordsList";

interface Props {
  squareGrid: string[][];
  word: string;
  setWord: (word: string) => void;
  words: string[];
  setWords: (words: string[]) => void;
  pressedTiles: number[][];
  setPressedTiles: (pressedTiles: number[][]) => void;
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
    setErrMessage,
  } = props;

  const [lastCharPos, setLastCharPos] = useState<number[]>([]);

  function createWord(char: string, location: number[]) {
    if (invalidTileTapped(location))
      return handleError("Tile already selected!");

    setWord(word + char);
    const pressed = [...pressedTiles, location];
    setPressedTiles(pressed);

    if (lastCharPos.length === 0) return setLastCharPos(location);

    doubleTapped(location) ? submitWord() : setLastCharPos(location);
  }

  function doubleTapped(location: number[]) {
    return lastCharPos[0] === location[0] && lastCharPos[1] === location[1];
  }

  function submitWord() {
    if (words.includes(word)) return handleError("Already guessed!");

    const newWords = [...words, word];
    setWords(newWords);

    resetWord();
  }

  function resetWord() {
    setWord("");
    setLastCharPos([]);
    setPressedTiles([]);
  }

  function selectedTiles(i: number, j: number) {
    return pressedTiles?.some((tile) => tile[0] === i && tile[1] === j);
  }

  function invalidTileTapped(location: number[]) {
    return (
      lastCharPos.length > 0 &&
      !doubleTapped(location) &&
      selectedTiles(location[0], location[1])
    );
  }

  function handleError(errMessage: string) {
    setErrMessage(errMessage);
    resetWord();
  }

  return (
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
                backgroundColor: blue[300],
                "&:hover": {
                  backgroundColor: blue[500],
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
                backgroundColor: lightGreen[300],
                "&:hover": {
                  backgroundColor: lightGreen[500],
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
                        backgroundColor: selectedTiles(i, j)
                          ? green[400]
                          : indigo[400],
                        "&:hover": {
                          backgroundColor: selectedTiles(i, j)
                            ? green[400]
                            : indigo[600],
                        },
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
      <Card sx={{ margin: 2, padding: 3 }}>
        <Box
          sx={{
            bgcolor: "#eeeeee",
            borderRadius: "4px",
            height: "100%",
            maxHeight: "472px",
            width: 200,
            margin: "auto",
            overflowY: "scroll",
          }}
        >
          {words?.length > 0 && <WordList words={words} setWords={setWords} />}
        </Box>
      </Card>
    </Box>
  );
}
