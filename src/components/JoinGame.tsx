import {Button, TextField} from "@mui/material";
import {lightGreen} from "@mui/material/colors";
import {useNavigate} from "@tanstack/react-router";
import {useState} from "react";

export default function JoinGame() {
  const [gameCode, setGameCode] = useState("");
  const navigate = useNavigate();
  const joinGame = (event: React.FormEvent) => {
    event.preventDefault();
    const roomCode = gameCode.trim();
    if (roomCode) navigate({to: "/scribbler/join", search: {roomCode}});
  };

  return (
    <form onSubmit={joinGame}>
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
        type="submit"
      >
        Join Game
      </Button>
    </form>
  );
}
