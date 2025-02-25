import { Stack, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router';

import './movieCard.css';

const MovieCard = ({ movie }) => {
  return (
    <Stack className="card">
      <Link to={`/movie/${movie.kinopoiskId}`}>
        <img
          src={movie.posterUrlPreview}
          alt={movie.nameRu}
          loading="lazy"
          className="img"
        />
      </Link>
      <Typography>{movie.nameRu ? movie.nameRu : movie.nameEn}</Typography>
    </Stack>
  );
};

export default MovieCard;
