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
import { Link, useNavigate, useParams } from 'react-router';

import useMovieDetails from '../../../hooks/useMovieDetails';
import ErrorMessage from '../../ui/ErrorMessage/ErrorMessage';
import MovieCard from '../../ui/MovieCard/MovieCard';
import VideoPlayer from '../../ui/VideoPlayer/VideoPlayer';

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

  if (loadingStatus)
    return (
      <Stack justifyContent="center" margin="auto">
        <CircularProgress size="8rem" />
      </Stack>
    );

  if (errorStatus) return <ErrorMessage />;

  console.log(staffData);

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
        <Grid item size={{ md: 6, sm: 12 }}>
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
        <Grid item size={{ md: 2, sm: 12 }}>
          <Typography variant="h6">В главных ролях</Typography>
          {staffData
            .filter((item) => item.professionText == 'Актеры')
            .slice(0, 9)
            .map(({ nameRu, staffId }) => (
              // <div key={nameRu}>
                <Typography
                  component={Link}
                  to={`/actor/${staffId}`}
                  style={{
                    color: 'inherit',
                    textDecoration: 'none',
                    marginBottom: '8px',
                  }}
                >
                  {nameRu}
                </Typography>
              </div>
            ))}
        </Grid>
        <Grid
          item
          size={12}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Typography variant="h5">Смотреть онлайн</Typography>
          <VideoPlayer />
        </Grid>
      </Grid>
      <Stack>
        <Typography variant="h5" textAlign="center" gutterBottom>
          Сиквелы и приквелы
        </Typography>
        <Stack direction="row" flexWrap="wrap" gap={2} justifyContent="center">
          {!sequelsAndPrequeslsData && (
            <Typography textAlign="center" gutterBottom>
              (Тут пусто)
            </Typography>
          )}
          {sequelsAndPrequeslsData &&
            sequelsAndPrequeslsData.map((item) => (
              <MovieCard key={item.filmId} movie={item} />
            ))}
        </Stack>
      </Stack>
    </>
  );
};
