"use client";

import { Box, Button, styled } from "@mui/material";
import { indigo } from "@mui/material/colors";
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

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(indigo[400]),
    backgroundColor: indigo[400],
    "&:hover": {
      backgroundColor: indigo[600],
    },
  }));

  function createWord(char: string, location: number[]) {
    setWord(word + char);
    if (lastCharPos[char]) {
      if (sameCharTapped(char, location)) {
        setWords([...words, word]);
        setWord("");
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

  return (
    <>
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
                  <ColorButton
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
                  </ColorButton>
                );
              })}
            </Box>
          );
        })}
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
