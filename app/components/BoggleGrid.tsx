'use client'

import { Box, Button } from '@mui/material';

interface Props {
  squareGrid: string[][];
}

export default function BoggleGrid(props: Props) {
  const { squareGrid } = props

  return (
    <Box sx={{ bgcolor: '#E7C8DD', height: '30vh', width: '30vh', margin: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
      {squareGrid.map((row, i) => {
        return (
          <>
            <Box key={i} sx={{ margin: 2, display: 'flex', justifyContent: 'space-around' }}>
              {
                row.map((char, j) => {
                  return (
                    <>
                      <Button key={j} sx={{ color: '#86626E', width: '4vw', height: '4vh' }}>{char}</Button>
                    </>
                  )
                })
              }
            </Box>
          </>
        )
      })}
    </Box>
  )
}