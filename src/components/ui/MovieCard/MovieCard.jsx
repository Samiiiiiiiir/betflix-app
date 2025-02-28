import { Box, Link, Rating, Stack, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router';

import './movieCard.css';

const MovieCard = ({ movie }) => {
  return (
    <Stack className="card" gap="10px">
      <Link component={RouterLink} to={`/movies/${movie.kinopoiskId}`}>
        <img
          src={movie.posterUrlPreview}
          alt={movie.nameRu}
          loading="lazy"
          className="img"
        />
        <Typography>{movie.nameRu ? movie.nameRu : movie.nameEn}</Typography>
      </Link>
      <Stack>
        {movie.ratingKinopoisk && (
          <Tooltip title={`${movie.ratingKinopoisk} / 10`}>
            <Box>
              <Rating
                name="read-only"
                value={movie.ratingKinopoisk / 2}
                readOnly
                precision={0.5}
              />
            </Box>
          </Tooltip>
        )}
      </Stack>
    </Stack>
  );
};

export default MovieCard;
