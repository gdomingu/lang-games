import {Box} from "@mui/material";
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
    </Box>
  );
}
