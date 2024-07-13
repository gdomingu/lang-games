import { Box, TextField, Button } from "@mui/material";
import { indigo, lightGreen, blue, green, purple } from "@mui/material/colors";

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
        <form>
            <label>
                Game code: 
                <TextField
                id="outlined-basic"
                variant="outlined"
                disabled
                placeholder="Enter game code"
                sx={{ marginRight: 2, marginLeft: 2, width: 220 }}
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
                  // onClick={submitWord}
                >
                  Join Game
                </Button>
        </form>
        </Box>
    );
}