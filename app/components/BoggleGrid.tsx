"use client";

import { Box, Button, styled, TextField } from "@mui/material";
import { indigo, lightGreen, blue, green } from "@mui/material/colors";
import { useState } from "react";

interface Props {
  squareGrid: string[][];
  word: string;
  setWord: (word: string) => void;
  words: string[];
  setWords: (words: string[]) => void;
  pressedTiles: number[][];
  setPressedTiles: (pressedTiles: number[][]) => void;
}

export default function BoggleGrid(props: Props) {
  const {
    squareGrid,
    words,
    setWords,
    word,
    setWord,
    pressedTiles,
    setPressedTiles,
  } = props;

  const [lastCharPos, setLastCharPos] = useState<{ [key: string]: number[] }>(
    {}
  );

  const CharTile = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(indigo[400]),
    backgroundColor: indigo[400],
    "&:hover": {
      backgroundColor: indigo[600],
    },
  }));

  const SubmitButton = styled(Button)(() => ({
    color: "#fff",
    backgroundColor: lightGreen[300],
    "&:hover": {
      backgroundColor: lightGreen[500],
    },
  }));

  const ClearButton = styled(Button)(() => ({
    color: "#fff",
    backgroundColor: blue[300],
    "&:hover": {
      backgroundColor: blue[500],
    },
  }));

  function createWord(char: string, location: number[]) {
    setWord(word + char);
    const pressed = [...pressedTiles, location];
    setPressedTiles(pressed);
    if (lastCharPos[char]) {
      if (sameCharTapped(char, location)) {
        submitWord();
      } else {
        updateLastCharPosition(char, location);
      }
    } else {
      updateLastCharPosition(char, location);
    }
  }

  function updateLastCharPosition(char: string, location: number[]) {
    let currentPosition: { [key: string]: number[] } = {};
    currentPosition[char] = location;

    setLastCharPos(currentPosition);
  }

  function sameCharTapped(char: string, location: number[]) {
    return (
      lastCharPos[char][0] === location[0] &&
      lastCharPos[char][1] === location[1]
    );
  }

  function submitWord() {
    const newWords = [...words, word];
    setWords(newWords);
    resetWord();
  }

  function resetWord() {
    setWord("");
    setLastCharPos({});
    setPressedTiles([]);
  }

  function selectedTiles(i: number, j: number) {
    return pressedTiles?.some((tile) => tile[0] === i && tile[1] === j);
  }

  return (
    <Box
      sx={{
        margin: "auto",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
      }}
    >
      <Box
        sx={{
          margin: "auto",
          height: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <ClearButton onClick={resetWord}>Clear</ClearButton>
        <TextField
          id="outlined-basic"
          variant="outlined"
          disabled
          defaultValue={word}
          sx={{ margin: "auto", marginRight: 2, marginLeft: 2 }}
        />

        <SubmitButton onClick={submitWord}>Submit</SubmitButton>
      </Box>
      <Box
        sx={{
          bgcolor: "#E7C8DD",
          height: 400,
          width: 400,
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        {squareGrid.map((row, i) => {
          return (
            <Box
              key={i}
              sx={{
                margin: 2,
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              {row.map((char, j) => {
                return (
                  <CharTile
                    onClick={() => createWord(char, [i, j])}
                    key={`${i}-${j}`}
                    sx={{
                      fontSize: 24,
                      fontWeight: 600,
                      width: 65,
                      height: 65,
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
                  </CharTile>
                );
              })}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
