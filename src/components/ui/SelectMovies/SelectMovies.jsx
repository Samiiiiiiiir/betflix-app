import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectQuery } from '../../../features/currentQuerySlice';
import { useGetGenresAndCountriesQuery } from '../../../services/kinopoiskApi';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const SelectMovies = () => {
  const dispatch = useDispatch();
  const { order, countries, genreId, year } = useSelector(
    (state) => state.currentQuery,
  );

  const { data, isLoading, isFetching, isError } =
    useGetGenresAndCountriesQuery();

  const ordersList = [
    {
      title: 'По рейтингу',
      value: 'RATING',
    },
    {
      title: 'По количеству оценок',
      value: 'NUM_VOTE',
    },
  ];

  const yearsList = new Array(60).fill(null).map((_, index) => ({
    title: new Date().getFullYear() - index,
    value: new Date().getFullYear() - index,
  }));

  if (isLoading || isFetching) return <div>Loading...</div>;

  if (isError) return <ErrorMessage />;

  return (
    <Stack
      sx={{ flexDirection: { sm: 'column', md: 'row' } }}
      gap="12px"
      mb={2}
      mt={2}
    >
      <FormControl fullWidth size="small">
        <InputLabel>Сортировка</InputLabel>
        <Select
          value={order}
          label="Сортировка"
          onChange={(e) => dispatch(selectQuery({ order: e.target.value }))}
        >
          {ordersList.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth size="small">
        <InputLabel>Страна</InputLabel>
        <Select
          value={countries}
          label="Страна"
          onChange={(e) => dispatch(selectQuery({ countries: e.target.value }))}
        >
          {data.countries.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.country}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth size="small">
        <InputLabel>Жанр</InputLabel>
        <Select
          label="Жанр"
          value={genreId}
          onChange={(e) => dispatch(selectQuery({ genreId: e.target.value }))}
        >
          {data.genres.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.genre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth size="small">
        <InputLabel>Год</InputLabel>
        <Select
          value={year}
          label="Год"
          onChange={(e) => dispatch(selectQuery({ year: e.target.value }))}
        >
          {yearsList.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box>
        <Button variant="outlined">Сбросить</Button>
      </Box>
    </Stack>
  );
};

export default SelectMovies;
