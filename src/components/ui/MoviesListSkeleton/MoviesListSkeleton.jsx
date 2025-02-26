import { Box, Skeleton, Stack } from '@mui/material';
import React from 'react';

const MoviesListSkeleton = () => {
  return (
    <Box mt={2} mb={2}>
      <Stack
        sx={{ margin: '5px' }}
        width="100%"
        direction="row"
        justifyContent="space-between"
      >
        <Skeleton
          animation="wave"
          variant="rectangular"
          width={100}
          height={32}
        />
        <Skeleton
          animation="wave"
          variant="rectangular"
          width={100}
          height={32}
        />
      </Stack>
      {new Array(5).fill(null).map((_, index) => (
        <Stack
          key={index}
          direction="row"
          justifyContent="center"
          flexWrap="wrap"
        >
          {new Array(4).fill(null).map((_, index) => (
            <Stack key={index}>
              <Skeleton
                animation="wave"
                variant="rectangular"
                width={215}
                height={320}
                sx={{ margin: '5px' }}
              />
              <Skeleton
                animation="wave"
                variant="text"
                width="50%"
                sx={{ margin: '5px' }}
              />
              <Skeleton
                animation="wave"
                variant="text"
                width="60%"
                sx={{ margin: '5px' }}
              />
            </Stack>
          ))}
        </Stack>
      ))}
    </Box>
  );
};

export default MoviesListSkeleton;
