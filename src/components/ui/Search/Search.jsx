import { Autocomplete, TextField } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

import { useGetFilmsQuery } from '../../../services/kinopoiskApi';

const Search = () => {
  const { countries, genreId, order, type, year, keyword } = useSelector(
    (state) => state.searchQuery,
  );

  const { data, isLoading, isFetching } = useGetFilmsQuery({
    countries,
    genreId,
    order,
    type,
    year,
    keyword,
  });

  // if (isLoading || isFetching) return <div>Loading...</div>;

  return (
    <Autocomplete
      sx={{ width: '300px' }}
      style={{ backgroundColor: '#fff' }}
      freeSolo
      options={data ? data.items.map((option) => option.nameRu) : []}
      renderInput={(params) => <TextField {...params} />}
    />
  );
};

export default Search;
