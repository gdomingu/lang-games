"use client";

import { Box, Button } from "@mui/material";
import { lightGreen } from "@mui/material/colors";
import { useState } from "react";
import BoggleCards from "../components/BoggleCards";

export default function Boggle() {
  const [squareGrid, setSquareGrid] = useState<string[][]>([]);
  const [startBtnText, setStartBtnText] = useState<string>("Start");
  const [word, setWord] = useState<string>("");
  const [words, setWords] = useState<string[]>([]);
  const [pressedTiles, setPressedTiles] = useState<number[][]>([]);

  const CHARS = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  function generate() {
    setStartBtnText("Shuffle");
    setWord("");
    setWords([]);
    setPressedTiles([]);

    let grid = [];
    for (let i = 0; i < 4; i++) {
      let row = [];
      for (let j = 0; j < 4; j++) {
        const randomIndex = getRandomIndex();
        row.push(CHARS[randomIndex]);
      }
      grid.push(row);
    }

    setSquareGrid(grid);
  }

  function getRandomIndex() {
    return Math.floor(Math.random() * 26);
  }

  return (
    <>
      <h2>Boggle</h2>
      <Box
        sx={{
          height: "100%",
          margin: 2,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          onClick={generate}
          variant="contained"
          sx={{
            margin: "auto",
            padding: "auto",
            color: "#fff",
            backgroundColor: lightGreen[400],
            "&:hover": {
              backgroundColor: lightGreen[600],
            },
          }}
        >
          {startBtnText}
        </Button>
        {squareGrid.length > 0 && (
          <BoggleCards
            squareGrid={squareGrid}
            words={words}
            setWords={setWords}
            word={word}
            setWord={setWord}
            pressedTiles={pressedTiles}
            setPressedTiles={setPressedTiles}
          />
        )}
      </Box>
    </>
  );
}
