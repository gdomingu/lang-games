import {Box, Button} from "@mui/material";
import {lightBlue} from "@mui/material/colors";
import {Link, Outlet, createFileRoute, useMatchRoute} from "@tanstack/react-router";
import JoinGame from "../components/JoinGame";

export const Route = createFileRoute("/scribbler")({component: ScribblerLayout});

function ScribblerLayout() {
  const matchRoute = useMatchRoute();
  if (!matchRoute({to: "/scribbler", fuzzy: false})) return <Outlet />;

  return (
    <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
      <h1>Scribbler</h1>
      <JoinGame />
      <Box sx={{marginTop: 4, textAlign: "center"}}>
        <p>Or create a new game</p>
        <Link to="/scribbler/new">
          <Button sx={{color: "#fff", height: 56, bgcolor: lightBlue[500]}}>New Game</Button>
        </Link>
      </Box>
    </Box>
  );
}