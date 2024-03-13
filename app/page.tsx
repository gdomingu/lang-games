import { Box, Typography } from "@mui/material";
import GameCards from "./home/GameCards";

export default function Home() {
  return (
    <>
      <Box sx={{ width: "100%", maxWidth: 500, marginBottom: 4 }}>
        <Typography variant="h2">Language Games</Typography>
        <Typography variant="subtitle1" sx={{ marginY: 3 }}>
          A site for playing games in different languages.
        </Typography>
        <Typography variant="body1">
          Grab your friends and family, and play games over zoom together. We
          aim to make every game customizable to your language. Unlike over game
          sites, will will not have ads.
        </Typography>
      </Box>
      <GameCards />
    </>
  );
}
