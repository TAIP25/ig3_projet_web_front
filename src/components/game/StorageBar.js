import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { ThemeProvider } from '@mui/material/styles';
import { Typography } from '@mui/material';

import theme from '../Theme';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 10,
    [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.background.default,
    },
    [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    },
}));

export default function StorageBar({nbCrops}) {
    const progress = nbCrops ? nbCrops : 0;
    const text = `${progress}/100`;
  
    return (
      <ThemeProvider theme={theme}>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <BorderLinearProgress variant="determinate" value={progress} sx={{ flexGrow: 1 }} />
          <Typography variant="body2" sx={{ ml: 1 }}>{text}</Typography>
        </Box>
      </ThemeProvider>
    );
  }