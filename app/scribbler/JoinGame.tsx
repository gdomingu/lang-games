import { TextField, Button } from "@mui/material";
import { lightGreen } from "@mui/material/colors";

export default function JoinGame() {

    return (
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
    )
}