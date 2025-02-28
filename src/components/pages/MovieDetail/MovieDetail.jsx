import React from 'react';
import { useParams } from 'react-router';

import useMovieDetails from '../../../hooks/useMovieDetails';
import ErrorMessage from '../../ui/ErrorMessage/ErrorMessage';

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

  if (loadingStatus) return <div>Loading...</div>;

  if (errorStatus) return <ErrorMessage />;

  return <div>MovieDetail</div>;
};
