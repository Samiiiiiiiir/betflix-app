import { Button, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useLocation } from 'react-router';

import { TOP_LISTS } from '../../../constanst';
import { useGetFilmsTopQuery } from '../../../services/kinopoiskApi';
import MoviesList from '../../ui/MoviesList/MoviesList';

const MoviesListTop = () => {
  const location = useLocation();
  const [page, setPage] = useState(1);

  const movieType = TOP_LISTS.find((item) => item.url === location.pathname);

  const { data, error, isLoading } = useGetFilmsTopQuery({
    type: movieType.value,
    page,
  });

  if (error) return <p>Something went wrong</p>;

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <Stack flexDirection="row">
        <Button>Назад</Button>
        <Typography>{movieType.title}</Typography>
      </Stack>
      <MoviesList
        movies={data.items}
        totalPages={data.totalPages}
        page={page}
        setPage={setPage}
      />
    </>
  );
};

export default MoviesListTop;
