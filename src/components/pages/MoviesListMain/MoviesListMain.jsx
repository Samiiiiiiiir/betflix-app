import { ArrowBack } from '@mui/icons-material';
import { Button, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';

import { MOVIE_LISTS } from '../../../constanst';
import { useGetFilmsQuery } from '../../../services/kinopoiskApi';
import ErrorMessage from '../../ui/ErrorMessage/ErrorMessage';
import MoviesList from '../../ui/MoviesList/MoviesList';
import MoviesListSkeleton from '../../ui/MoviesListSkeleton/MoviesListSkeleton';
import SelectMovies from '../../ui/SelectMovies/SelectMovies';

const MoviesListMain = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [location]);

  const type = MOVIE_LISTS.find((item) => item.url == location.pathname);

  const { countries, genreId, order, year } = useSelector(
    (state) => state.currentQuery,
  );

  const { data, isLoading, isFetching, isError } = useGetFilmsQuery({
    countries,
    type: type.value,
    order,
    year,
    genres: type.title == 'Мультфильмы' ? 18 : genreId,
    page,
  });

  if (isLoading || isFetching) return <MoviesListSkeleton />;

  if (isError) return <ErrorMessage />;

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
        <Typography variant="h6">{type.title}</Typography>
      </Stack>
      <SelectMovies />
      <MoviesList
        movies={data.items}
        totalPages={data.totalPages}
        page={page}
        setPage={setPage}
      />
    </>
  );
};

export default MoviesListMain;
