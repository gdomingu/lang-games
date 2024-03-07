"use client";

import { Box, Button } from "@mui/material";
import { useState } from "react";
import BoggleGrid from "../components/BoggleGrid";

export default function Boggle() {
  const [squareGrid, setSquareGrid] = useState<string[][]>([]);
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
          bgcolor: "#cfe8fc",
          height: "50vh",
          margin: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            bgcolor: "#E2E4F6",
            height: "30vh",
            width: "30vh",
            margin: "auto",
          }}
        >
          {squareGrid.length > 0 && <BoggleGrid squareGrid={squareGrid} />}
        </Box>
        <Button onClick={generate} variant="contained" sx={{ margin: "auto" }}>
          Start
        </Button>
      </Box>
    </>
  );
}
