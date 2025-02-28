import { ArrowBack } from '@mui/icons-material';
import { Button, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { TOP_LISTS } from '../../../constanst';
import { useGetFilmsTopQuery } from '../../../services/kinopoiskApi';
import ErrorMessage from '../../ui/ErrorMessage/ErrorMessage';
import MoviesList from '../../ui/MoviesList/MoviesList';
import MoviesListTopSkeleton from './MoviesListTopSkeleton';

const MoviesListTop = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const movieType = TOP_LISTS.find((item) => item.url === location.pathname);

  const { data, error, isLoading, isFetching } = useGetFilmsTopQuery({
    type: movieType.value,
    page,
  });

  useEffect(() => {
    setPage(1);
  }, [location]);

  if (isLoading || isFetching) return <MoviesListTopSkeleton />;

  if (error) return <ErrorMessage />;

  return (
    <>
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems={'center'}
        sx={{ marginBlock: '10px' }}
      >
        <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)}>
          Назад
        </Button>
        <Typography variant="h6">{movieType.title}</Typography>
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
