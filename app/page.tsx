import { Container, Box } from '@mui/material';

export default function Home() {
  return (
    <>
      <p>Home page</p>
      <Container maxWidth="sm">
        <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }} />
      </Container>
    </>
  );
}
