"use client";

import { Box, IconButton, Card } from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

interface Props {
  words: string[];
  setWords: (words: string[]) => void;
}

export default function WordList(props: Props) {
  const { words, setWords } = props;

  function removeWord(wordToRemove: string) {
    const filteredWords = words.filter((word) => word !== wordToRemove);
    setWords(filteredWords);
  }

  return (
    <Card sx={{ margin: 2, padding: 3 }}>
      <Box
        sx={{
          bgcolor: "#eeeeee",
          borderRadius: "4px",
          height: "100%",
          maxHeight: "472px",
          width: 200,
          margin: "auto",
          overflowY: "scroll",
        }}
      >
        {words?.length > 0 &&
          words.map((word, i) => {
            return (
              <Box
                key={i}
                sx={{
                  color: "#424242",
                  fontWeight: 600,
                  width: "100%",
                  marginTop: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box sx={{ marginLeft: 2 }}>{word}</Box>
                <Box sx={{ marginRight: 1 }}>
                  <IconButton onClick={() => removeWord(word)}>
                    <DeleteOutlinedIcon></DeleteOutlinedIcon>
                  </IconButton>
                </Box>
              </Box>
            );
          })}
      </Box>
    </Card>
  );
}
