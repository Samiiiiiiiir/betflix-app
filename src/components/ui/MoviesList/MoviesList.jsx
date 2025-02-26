import { Pagination, Stack } from '@mui/material';
import React from 'react';

import MovieCard from '../MovieCard/MovieCard';

const MoviesList = ({ movies, totalPages, page, setPage }) => {
  return (
    <>
      <Stack direction="row" justifyContent="center" flexWrap="wrap" gap="20px">
        {movies.map((item) => (
          <MovieCard key={item.kinopoiskId} movie={item} />
        ))}
      </Stack>
      <Stack
        alignItems="center"
        sx={{
          marginBlock: '10px',
        }}
      >
        <Pagination
          count={totalPages}
          page={page}
          onChange={(event, value) => setPage(value)}
          shape="rounded"
        />
      </Stack>
    </>
  );
};

export default MoviesList;
