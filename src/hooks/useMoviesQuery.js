import { useSelector } from 'react-redux';

import { TOP_LISTS } from '../constanst';
import {
  useGetFilmsQuery,
  useGetFilmsTopQuery,
} from '../services/kinopoiskApi';

const useMoviesQuery = () => {
  const { countries, order, year, page } = useSelector(
    (state) => state.currentQuery,
  );

  const responsePopular = useGetFilmsTopQuery({
    type: TOP_LISTS.find((item) => item.value === 'TOP_POPULAR_MOVIES').value,
    page,
  });

  const responseBest = useGetFilmsTopQuery({
    type: TOP_LISTS.find((item) => item.value === 'TOP_250_MOVIES').value,
    page,
  });

  const responseFilms = useGetFilmsQuery({
    genres: '1',
    type: 'FILM',
    countries,
    order,
    year,
    page,
  });

  const responseSerials = useGetFilmsQuery({
    genres: '1',
    type: 'TV_SERIES',
    countries,
    order,
    year,
    page,
  });

  const responseCartoons = useGetFilmsQuery({
    genres: '18',
    type: 'FILM',
    countries,
    order,
    year,
    page,
  });

  const isLoading =
    responsePopular.isLoading ||
    responseBest.isLoading ||
    responseFilms.isLoading ||
    responseSerials.isLoading ||
    responseCartoons.isLoading;

  const hasError =
    responsePopular.isError ||
    responseBest.isError ||
    responseFilms.isError ||
    responseSerials.isError ||
    responseCartoons.isError;

  return {
    isLoading,
    hasError,
    responsePopular,
    responseBest,
    responseFilms,
    responseSerials,
    responseCartoons,
  };
};

export default useMoviesQuery;
