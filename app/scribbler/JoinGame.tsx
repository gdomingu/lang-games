"use client";
import {Button, TextField} from "@mui/material";
import {lightGreen} from "@mui/material/colors";
import {useState} from "react";

export default function JoinGame() {
  const [gameCode, setGameCode] = useState("");
  const submitWord = () => {
    // TODO - Implement this function
    console.log(`Joining game with code: ${gameCode}`);
  };

  return (
    <form>
      <label>
        Game code:
        <TextField
          id="outlined-basic"
          variant="outlined"
          placeholder="Enter game code"
          sx={{marginRight: 2, marginLeft: 2, width: 220}}
          onChange={e => setGameCode(e.target.value)}
        />
      </label>
      <Button
        sx={{
          color: "#fff",
          height: 56,
          backgroundColor: lightGreen[500],
          "&:hover": {
            backgroundColor: lightGreen[700],
          },
        }}
        onClick={submitWord}
      >
        Join Game
      </Button>
    </form>
  );
}
