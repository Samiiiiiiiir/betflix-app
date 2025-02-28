import { ArrowBack } from '@mui/icons-material';
import {
  Button,
  ButtonGroup,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import React from 'react';
import { useNavigate, useParams } from 'react-router';

import useMovieDetails from '../../../hooks/useMovieDetails';
import ErrorMessage from '../../ui/ErrorMessage/ErrorMessage';

export const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    filmData,
    sequelsAndPrequeslsData,
    staffData,
    loadingStatus,
    errorStatus,
  } = useMovieDetails(id);

  console.log(filmData, sequelsAndPrequeslsData, staffData);

  if (loadingStatus)
    return (
      <Stack justifyContent="center" margin="auto">
        <CircularProgress size="8rem" />
      </Stack>
    );

  if (errorStatus) return <ErrorMessage />;

  return (
    <>
      <Grid
        container
        spacing={3}
        sx={{
          paddingBlock: '20px',
        }}
      >
        <Grid item size={4}>
          <img
            src={filmData.posterUrlPreview}
            alt={filmData.nameRu}
            width="100%"
            loading="lazy"
          />
          <ButtonGroup
            variant="outlined"
            size="small"
            sx={{ justifyContent: 'center', width: '100%' }}
          >
            <Button target="_blank" href={filmData.webUrl}>
              Кинопоиск
            </Button>
            <Button
              target="_blank"
              href={`https://www.imdb.com/title/${filmData.imdbId}`}
            >
              IMDB
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid item size={6}>
          <Grid
            container
            sx={{
              alignItems: 'start',
              paddingBottom: '8px',
            }}
          >
            <Grid size={4}>
              <Button
                startIcon={<ArrowBack />}
                size="medium"
                onClick={() => navigate(-1)}
              >
                Назад
              </Button>
            </Grid>
            <Grid size={8}>
              <Typography variant="h5">{filmData.nameRu}</Typography>{' '}
            </Grid>
          </Grid>
          <Grid container rowSpacing={2}>
            <Grid size={6}>Год</Grid>
            <Grid size={6}>{filmData.year}</Grid>
            <Grid size={6}>Страна</Grid>
            <Grid size={6}>
              {filmData.countries
                .reduce((acc, { country }) => acc + country + ', ', '')
                .slice(0, -2)}
            </Grid>
            <Grid size={6}>Жанр</Grid>
            <Grid size={6}>
              {filmData.genres
                .reduce((acc, { genre }) => acc + genre + ', ', '')
                .slice(0, -2)}
            </Grid>
            <Grid size={6}>Режиссеры</Grid>
            <Grid size={6}>
              {staffData
                .filter((item) => item.professionText == 'Режиссеры')
                .reduce((acc, { nameRu }) => acc + nameRu + ', ', '')
                .slice(0, -2)}
            </Grid>
            <Grid size={6}>Длительность</Grid>
            <Grid size={6}>
              {filmData.filmLength
                ? `${filmData.filmLength} минут`
                : 'Нет данных'}
            </Grid>
            <Grid size={12}>
              <Typography gutterBottom>Описание</Typography>
              <Typography>
                {filmData.description
                  ? filmData.description
                  : 'Описание отсутствует'}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item size={2}>
          <Typography variant="h6">В главных ролях</Typography>
          {staffData
            .filter((item) => item.professionText == 'Актеры')
            .slice(0, 9)
            .map(({ nameRu }) => (
              <Typography key={nameRu} gutterBottom>
                {nameRu}
              </Typography>
            ))}
        </Grid>
      </Grid>
    </>
  );
};
