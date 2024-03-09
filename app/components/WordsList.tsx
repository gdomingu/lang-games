"use client";

interface Props {
  words: string[];
}
import { Box } from "@mui/material";

export default function WordList(props: Props) {
  const { words } = props;

  return (
    <>
      {words.map((word, i) => {
        return (
          <Box
            key={i}
            sx={{
              color: "#424242",
              fontWeight: 600,
              cursor: "pointer",
              marginTop: 2,
            }}
          >
            {word}
          </Box>
        );
      })}
    </>
  );
}
