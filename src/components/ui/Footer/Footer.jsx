import { Stack, Typography } from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router';

export const Footer = () => {
  return (
    <Stack
      component="footer"
      sx={{
        paddingBlock: 4,
        flexDirection: {
          sm: 'row',
        },
        justifyContent: {
          sm: 'space-between',
        },
        alignItems: {
          sm: 'center',
        },
        marginTop: 'auto',
      }}
    >
      <Typography variant="body2" color="text.secondary">
        &copy; {new Date().getFullYear()} &laquo;betflix&raquo; 18+ <br />
        Данный сайт создан исключительно в обучающих целях. <br />
        Все права принадлежат правообладателям.
      </Typography>
      <Typography
        component={RouterLink}
        to="/"
        variant="h5"
        color="primary.main"
        style={{ textDecoration: 'none' }}
      >
        betflix
      </Typography>
    </Stack>
  );
};
