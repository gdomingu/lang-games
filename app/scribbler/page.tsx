import {Box, Button} from "@mui/material";
import {lightBlue} from "@mui/material/colors";
import Link from "next/link";
import JoinGame from "./JoinGame";

export default function Page() {
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <h1>Scribbler</h1>
      <JoinGame />
      <Box sx={{marginTop: 4, textAlign: "center"}}>
        <p>Or create a new game</p>
        <Link href="/scribbler/new" passHref>
          <Button
            sx={{
              color: "#fff",
              height: 56,
              backgroundColor: lightBlue[500],
              "&:hover": {
                backgroundColor: lightBlue[700],
              },
            }}
          >
            New Game
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
