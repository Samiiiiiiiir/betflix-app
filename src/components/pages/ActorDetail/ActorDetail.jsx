import { ArrowBack } from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import React from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router';

import { useGetActorDetailsQuery } from '../../../services/kinopoiskApi';
import ErrorMessage from '../../ui/ErrorMessage/ErrorMessage';

export const ActorDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: actor,
    isLoading,
    isFetching,
    isError,
  } = useGetActorDetailsQuery(id);

  if (isLoading || isFetching)
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        margin="auto"
      >
        <CircularProgress size="8rem" />
      </Box>
    );

  if (isError) return <ErrorMessage />;

  return (
    <>
      <Grid
        container
        spacing={3}
        sx={{
          paddingBlock: '20px',
        }}
      >
        <Grid item size={{ md: 4, sm: 12 }}>
          <img src={actor.posterUrl} alt={actor.nameRu} width="100%" />
        </Grid>
        <Grid item size={{ md: 8, sm: 12 }}>
          <Stack direction="row" gap={2} alignItems="center" mb="4px">
            <Button
              startIcon={<ArrowBack />}
              size="medium"
              onClick={() => navigate(-1)}
            />
            <div>
              <Typography variant="h5">{actor.nameRu}</Typography>
              <Typography>{actor.nameEn}</Typography>
            </div>
          </Stack>
          <Typography variant="h6" mb={1}>
            Об актере
          </Typography>
          <Grid container width="100%" spacing={1} mb={1}>
            <Grid item size={6}>
              Карьера
            </Grid>
            <Grid item size={6}>
              {actor.profession}
            </Grid>
            <Grid item size={6}>
              Рост
            </Grid>
            <Grid item size={6}>
              {actor.growth}
            </Grid>
            <Grid item size={6}>
              Дата рождения
            </Grid>
            <Grid item size={6}>
              {actor.birthday}
            </Grid>
            <Grid item size={6}>
              Всего фильмов
            </Grid>
            <Grid item size={6}>
              {actor.films.length}
            </Grid>
          </Grid>
          <Typography variant="h6">Факты</Typography>
          <div>
            {actor.facts.map((item, i) => (
              <p key={i}>{item}</p>
            ))}
          </div>
        </Grid>
      </Grid>
      <Typography variant="h5" gutterBottom>
        Фильмы
      </Typography>
      <Stack>
        {actor.films.map((item, i) => (
          <Stack
            key={item.filmId}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={1}
          >
            <div>{i + 1}.</div>
            <Link component={RouterLink} to={`/movies/${item.filmId}`}>
              {item.nameRu ? item.nameRu : 'Неизвестно'}
            </Link>
            <div>{item.rating ? item.rating : '-'}</div>
          </Stack>
        ))}
      </Stack>
    </>
  );
};
