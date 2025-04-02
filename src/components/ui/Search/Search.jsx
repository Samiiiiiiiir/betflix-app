import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

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

  const navigate = useNavigate();

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

  const { data, isFetching } = useGetFilmsQuery({
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
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: '10px',
      }}
      freeSolo
      getOptionLabel={(option) =>
        `${option.nameRu} - ${movieTypes[option.type]} (${option.year})`
      }
      options={data ? data.items : []}
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
      onChange={(_, value) => {
        if (value) {
          navigate(`/movies/${value.kinopoiskId}`);
        }
      }}
    />
  );
};

export default Search;
