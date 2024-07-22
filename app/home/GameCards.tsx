import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  Typography,
  Box,
} from "@mui/material";
import Link from "next/link";

export default function MediaCard() {
  const cardData = [
    {
      title: "Scribbler",
      description:
        "A game where you draw and guess the word. " +
        "You can upload your own word list.",
      image: "../pictionary-placeholder.jpg",
      link: "/scribbler",
    },
    {
      title: "Boggle",
      description:
        "A game where you find words in a grid of letters. " + 
        "You can choose your alphabet and letter distribution.",
      image: "../boggle-placeholder.jpg",
      link: "/boggle",
    },
  ];

  return (
    <Stack direction="row" spacing={2}>
      {cardData.map((card, index) => {
        return (
          <Card
            key={index}
            sx={{ maxWidth: 345, display: "flex", flexDirection: "column" }}
          >
            <Box sx={{ flexGrow: 1 }}>
              <CardMedia
                sx={{ height: 140 }}
                image={card.image}
                title={card.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {card.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {card.description}
                </Typography>
              </CardContent>
            </Box>
            <CardActions>
              <Link href={card.link} passHref>
                <Button size="small">Play {card.title}</Button>
              </Link>
            </CardActions>
          </Card>
        );
      })}
    </Stack>
  );
}
