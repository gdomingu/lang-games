import { Box, Button, Stack } from '@mui/material';

export default function Boggle() {
  return (
    <>
      <p>Bogglegggg</p>
      <Box sx={{ bgcolor: '#cfe8fc', height: '50vh', margin: 2, display: 'flex' }}>
        <Box sx={{ bgcolor: '#E2E4F6', height: '30vh', width: '30vh', margin: 'auto' }}></Box>
      </Box>
      <Stack spacing={2} sx={{ margin: 2 }}>
        <Button variant="contained">Start</Button>
      </Stack>
    </>
  );
}