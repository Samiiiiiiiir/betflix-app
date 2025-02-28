import { CircularProgress, Stack } from '@mui/material';
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

  if (loadingStatus)
    return (
      <Stack justifyContent="center" margin="auto">
        <CircularProgress size="8rem" />
      </Stack>
    );

  if (errorStatus) return <ErrorMessage />;

  return <div>MovieDetail</div>;
};
