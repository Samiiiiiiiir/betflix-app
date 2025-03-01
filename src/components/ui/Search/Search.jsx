import {
  Autocomplete,
  CircularProgress,
  Stack,
  TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setSearchQuery } from '../../../features/searchQuerySlice';
import { useGetFilmsQuery } from '../../../services/kinopoiskApi';

const movieTypes = {
  FILM: 'Фильм',
  TV_SERIES: 'Сериал',
  TV_SHOW: 'ТВ-шоу',
  MINI_SERIES: 'Мини-сериал',
};

const Search = () => {
  const [input, setInput] = useState('');

  const dispatch = useDispatch();

  const { countries, genreId, order, type, year, keyword } = useSelector(
    (state) => state.searchQuery,
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(setSearchQuery(input));
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [input]);

  const { data, isLoading, isFetching } = useGetFilmsQuery({
    countries,
    genreId,
    order,
    type,
    year,
    keyword,
  });

  return (
    <Autocomplete
      sx={{ width: '300px' }}
      style={{ backgroundColor: '#fff' }}
      freeSolo
      options={
        data
          ? data.items.map(
              (option) =>
                `${option.nameRu} - ${movieTypes[option.type]} (${option.year})`,
            )
          : []
      }
      renderInput={(params) => (
        <TextField
          {...params}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {isFetching && <CircularProgress size="2rem" />}
              </React.Fragment>
            ),
          }}
        />
      )}
      onInputChange={(_, value) => {
        setInput(value);
      }}
    />
  );
};

export default Search;
