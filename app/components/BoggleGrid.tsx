"use client";

import { Box, Button, styled } from "@mui/material";
import { indigo } from "@mui/material/colors";

interface Props {
  squareGrid: string[][];
}

export default function BoggleGrid(props: Props) {
  const { squareGrid } = props;

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(indigo[400]),
    backgroundColor: indigo[400],
    "&:hover": {
      backgroundColor: indigo[600],
    },
  }));

  return (
    <Box
      sx={{
        bgcolor: "#E7C8DD",
        height: 400,
        width: 400,
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
      }}
    >
      {squareGrid.map((row, i) => {
        return (
          <>
            <Box
              key={i}
              sx={{
                margin: 2,
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              {row.map((char, j) => {
                return (
                  <>
                    <ColorButton
                      key={j}
                      variant="contained"
                      color="success"
                      sx={{
                        fontSize: 24,
                        fontWeight: 600,
                        width: 65,
                        height: 65,
                      }}
                    >
                      {char}
                    </ColorButton>
                  </>
                );
              })}
            </Box>
          </>
        );
      })}
    </Box>
  );
}
