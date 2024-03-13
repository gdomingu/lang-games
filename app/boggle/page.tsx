"use client";

import { Box, Button, Snackbar } from "@mui/material";
import { orange } from "@mui/material/colors";
import { useState, useEffect } from "react";
import BoggleCards from "../components/BoggleCards";

export default function Boggle() {
  const [squareGrid, setSquareGrid] = useState<string[][]>([]);
  const [word, setWord] = useState<string>("");
  const [words, setWords] = useState<string[]>([]);
  const [pressedTiles, setPressedTiles] = useState<number[][]>([]);
  const [errMessage, setErrMessage] = useState<string>("");

  const CHARS = "abcdefghijklmnopqrstuvwxyz".split("");

  useEffect(() => {
    generate();
  }, []);

  function generate() {
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
    return Math.floor(Math.random() * CHARS.length);
  }

  function handleClose(event: React.SyntheticEvent | Event, reason?: string) {
    if (reason === "clickaway") return;

    setErrMessage("");
  }

  return (
    <>
      {squareGrid.length > 0 && (
        <>
          <Box
            sx={{
              height: "100%",
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
                  backgroundColor: orange[500],
                  "&:hover": {
                    backgroundColor: orange[700],
                  },
                }}
              >
                SHUFFLE
              </Button>
            </Box>
          </Box>

          <Box sx={{ display: "flex" }}>
            <BoggleCards
              squareGrid={squareGrid}
              setSquareGrid={setSquareGrid}
              words={words}
              setWords={setWords}
              word={word}
              setWord={setWord}
              pressedTiles={pressedTiles}
              setPressedTiles={setPressedTiles}
              errMessage={errMessage}
              setErrMessage={setErrMessage}
            />
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
      )}
    </>
  );
}
