"use client";

import { Box, Button, styled, TextField } from "@mui/material";
import { indigo, lightGreen, blue } from "@mui/material/colors";
import { useState } from "react";
import WordList from "./WordsList";

interface Props {
  squareGrid: string[][];
}

export default function BoggleGrid(props: Props) {
  const { squareGrid } = props;
  const [words, setWords] = useState<string[]>([]);
  const [word, setWord] = useState<string>("");
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

  const GoButton = styled(Button)(() => ({
    color: "#fff",
    backgroundColor: lightGreen[300],
    "&:hover": {
      backgroundColor: lightGreen[500],
    },
  }));

  const ResetButton = styled(Button)(() => ({
    color: "#fff",
    backgroundColor: blue[300],
    "&:hover": {
      backgroundColor: blue[500],
    },
  }));

  function createWord(char: string, location: number[]) {
    setWord(word + char);
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
    setWords([...words, word]);
    resetWord();
  }

  function resetWord() {
    setWord("");
    setLastCharPos({});
  }

  return (
    <>
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
          <ResetButton onClick={resetWord}>Reset</ResetButton>
          <TextField
            id="outlined-basic"
            variant="outlined"
            disabled
            defaultValue={word}
            sx={{ margin: "auto", marginRight: 2, marginLeft: 2 }}
          />

          <GoButton onClick={submitWord}>Go</GoButton>
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
                      variant="contained"
                      color="success"
                      sx={{
                        fontSize: 24,
                        fontWeight: 600,
                        width: 65,
                        height: 65,
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
      <Box>
        {words.length > 0 && (
          <>
            <WordList words={words} />
          </>
        )}
      </Box>
    </>
  );
}
