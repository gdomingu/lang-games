import { Button, Card, CardActions, CardContent, CardMedia, Stack, Typography, Box } from '@mui/material';
import Link from 'next/link';

export default function MediaCard() {
  return (
    <Stack direction="row" spacing={2}>
      <Card sx={{ maxWidth: 345, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ flexGrow: 1 }}>

          <CardMedia
            sx={{ height: 140 }}
            image=""
            title="Pictionary image"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Pictionary
            </Typography>
            <Typography variant="body2" color="text.secondary">
              A game where you draw and guess the word. You can upload your own word list.
            </Typography>
          </CardContent>
        </Box>
        <CardActions>
          <Link href="/pictionary" passHref>
            <Button size="small">Play Pictionary</Button>
          </Link>
        </CardActions>
      </Card>
      <Card sx={{ maxWidth: 345, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ flexGrow: 1 }}>

          <CardMedia
            sx={{ height: 140 }}
            image=""
            title="Boggle image"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Boggle
            </Typography>
            <Typography variant="body2" color="text.secondary">
              A game where you find words in a grid of letters. You can choose your alphabet and letter distribution.
            </Typography>
          </CardContent>
        </Box>
        <CardActions>
          <Link href="/boggle" passHref>
            <Button size="small">Play Boggle</Button>
          </Link>
        </CardActions>
      </Card>
    </Stack>
  );
}