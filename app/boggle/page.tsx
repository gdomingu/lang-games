"use client";

import { Box, Button, Snackbar } from "@mui/material";
import { lightGreen } from "@mui/material/colors";
import { useState } from "react";
import BoggleCards from "../components/BoggleCards";

export default function Boggle() {
  const [squareGrid, setSquareGrid] = useState<string[][]>([]);
  const [startBtnText, setStartBtnText] = useState<string>("Start");
  const [word, setWord] = useState<string>("");
  const [words, setWords] = useState<string[]>([]);
  const [pressedTiles, setPressedTiles] = useState<number[][]>([]);
  const [errMessage, setErrMessage] = useState<string>("");

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

  function handleClose(event: React.SyntheticEvent | Event, reason?: string) {
    if (reason === "clickaway") return;

    setErrMessage("");
  }

  return (
    <>
      <Box
        sx={{
          height: "100%",
          margin: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <Box>
          <h2>Boggle</h2>
        </Box>
        <Box>
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
        </Box>
      </Box>
      <Box sx={{ display: "flex" }}>
        {squareGrid.length > 0 && (
          <BoggleCards
            squareGrid={squareGrid}
            words={words}
            setWords={setWords}
            word={word}
            setWord={setWord}
            pressedTiles={pressedTiles}
            setPressedTiles={setPressedTiles}
            errMessage={errMessage}
            setErrMessage={setErrMessage}
          />
        )}
      </Box>
      {!!errMessage && (
        <Snackbar
          ContentProps={{ sx: { backgroundColor: "#e57373" } }}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={!!errMessage}
          autoHideDuration={2000}
          onClose={handleClose}
          message={errMessage}
        />
      )}
    </>
  );
}
