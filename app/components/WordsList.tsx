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
            mx={{
              color: "#fff",
              fontsize: 16,
              fontWeight: 600,
              marginBottom: 16,
              cursor: "pointer",
            }}
          >
            {word}
          </Box>
        );
      })}
    </>
  );
}
