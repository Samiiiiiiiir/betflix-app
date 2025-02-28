import { CircularProgress, Stack } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router';

import useMovieDetails from '../../../hooks/useMovieDetails';
import ErrorMessage from '../../ui/ErrorMessage/ErrorMessage';

import './movieDetails.css';

export const MovieDetail = () => {
  const { id } = useParams();

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
      <div className="movie-detail__wrapper">
        <div className="movie-details__item movie-details__item--poster">
          <img
            src={filmData.posterUrlPreview}
            alt={filmData.nameRu}
            // width="100%"
            // height="410"
          />
        </div>
        <div className="movie-details__item movie-details__inner">
          <div className="movie-details__inner-column">
            <span>Год</span>
            <span>Страна</span>
            <span>Жанр</span>
            <span>Режиссер</span>
            <span>Длительность</span>
          </div>
          <div className="movie-details__inner-column">
            <span>{filmData.year}</span>
            <span>
              {filmData.countries.reduce((acc, item, index) => {
                if (index != filmData.countries.length - 1) {
                  return acc + item.country + ', ';
                }
                return acc + item.country;
              }, '')}
            </span>
            <span>
              {filmData.genres.reduce((acc, item, index) => {
                if (index != filmData.genres.length - 1) {
                  return acc + item.genre + ', ';
                }
                return acc + item.genre;
              }, '')}
            </span>
            <span>Режиссер</span>
            <span>{filmData.filmLength} минут</span>
          </div>
        </div>
        <div className="movie-details__item">Оценки</div>
        <div className="movie-details__item movie-details__item--large">
          <span></span> Описание:
          <p>{filmData.description ? filmData.description : 'Нет описания'}</p>
        </div>
      </div>
    </>
  );
};
