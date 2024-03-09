"use client";

interface Props {
  words: string[];
}
import { Box, IconButton } from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

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
              width: "100%",
              marginTop: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ marginLeft: 2 }}>{word}</Box>
            <Box sx={{ marginRight: 1 }}>
              <IconButton>
                <DeleteOutlinedIcon></DeleteOutlinedIcon>
              </IconButton>
            </Box>
          </Box>
        );
      })}
    </>
  );
}
