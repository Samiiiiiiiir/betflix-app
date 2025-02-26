import { Box, Typography } from '@mui/material';
import React from 'react';

const ErrorMessage = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      margin="auto"
    >
      <Typography variant="h4" color="red">
        Произошла ошибка
      </Typography>
    </Box>
  );
};

export default ErrorMessage;
