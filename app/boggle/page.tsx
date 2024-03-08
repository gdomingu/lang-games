"use client";

import { Box, Button, styled } from "@mui/material";
import { lightGreen } from "@mui/material/colors";
import { useState } from "react";
import BoggleGrid from "../components/BoggleGrid";

export default function Boggle() {
  const [squareGrid, setSquareGrid] = useState<string[][]>([]);
  const [startBtnText, setStartBtnText] = useState<string>("Start");

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

  const StartButton = styled(Button)(() => ({
    color: "#fff",
    backgroundColor: lightGreen[400],
    "&:hover": {
      backgroundColor: lightGreen[600],
    },
  }));

  function generate() {
    setStartBtnText("Shuffle");
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
        }}
      >
        <StartButton
          onClick={generate}
          variant="contained"
          sx={{ margin: "auto", padding: "auto" }}
        >
          {startBtnText}
        </StartButton>
        {squareGrid.length > 0 && (
          <>
            <BoggleGrid squareGrid={squareGrid} />
            <Box
              sx={{
                bgcolor: "#DEFFFC",
                height: 200,
                width: 100,
                margin: "auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              foo
            </Box>
          </>
        )}
      </Box>
    </>
  );
}
