import {Box, Button, Snackbar} from "@mui/material";
import {orange} from "@mui/material/colors";
import {createFileRoute} from "@tanstack/react-router";
import {useEffect, useState} from "react";
import BoggleCards from "../components/BoggleCards";

export const Route = createFileRoute("/boggle")({component: Boggle});

function Boggle() {
  const [squareGrid, setSquareGrid] = useState<string[][]>([]);
  const [word, setWord] = useState("");
  const [words, setWords] = useState<string[]>([]);
  const [pressedTiles, setPressedTiles] = useState<number[][]>([]);
  const [errMessage, setErrMessage] = useState("");

  function generate() {
    const chars = "abcdefghijklmnopqrstuvwxyz";
    setWord("");
    setWords([]);
    setPressedTiles([]);
    setSquareGrid(
      Array.from({length: 4}, () =>
        Array.from({length: 4}, () => chars[Math.floor(Math.random() * chars.length)]),
      ),
    );
  }

  useEffect(generate, []);

  return squareGrid.length ? (
    <>
      <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
        <h2>Boggle</h2>
        <Button onClick={generate} variant="contained" sx={{color: "#fff", bgcolor: orange[500]}}>
          Shuffle
        </Button>
      </Box>
      <Box sx={{display: "flex"}}>
        <BoggleCards {...{squareGrid, setSquareGrid, words, setWords, word, setWord, pressedTiles, setPressedTiles, errMessage, setErrMessage}} />
      </Box>
      <Snackbar open={!!errMessage} autoHideDuration={2000} onClose={() => setErrMessage("")} message={errMessage} />
    </>
  ) : null;
}