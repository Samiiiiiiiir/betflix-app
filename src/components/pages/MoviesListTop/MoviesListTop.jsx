import React from 'react';

import { useGetFilmsTopQuery } from '../../../services/kinopoiskApi';

const MoviesListTop = () => {
  const { data, error, isLoading } = useGetFilmsTopQuery('TOP_POPULAR_ALL', 1);

  console.log(data, error, isLoading);

  return <div>MoviesListTop</div>;
};

export default MoviesListTop;
