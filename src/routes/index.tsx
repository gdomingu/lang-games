import {Box, Typography} from "@mui/material";
import {createFileRoute} from "@tanstack/react-router";
import GameCards from "../components/GameCards";

export const Route = createFileRoute("/")({component: Home});

function Home() {
  return (
    <>
      <Box sx={{width: "100%", maxWidth: 500, marginBottom: 4}}>
        <Typography variant="h2">Language Games</Typography>
        <Typography variant="subtitle1" sx={{marginY: 3}}>
          A site for playing games in different languages.
        </Typography>
        <Typography variant="body1">
          Grab your friends and family, and play games over Zoom together. Every game aims to be
          customizable to your language, without ads.
        </Typography>
      </Box>
      <GameCards />
    </>
  );
}