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

import { useGetGenresAndCountriesQuery } from '../../../services/kinopoiskApi';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const SelectMovies = () => {
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

  const handleChange = (e) => {
    console.log(e);
  };

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
        <Select label="Сортировка" onChange={handleChange}>
          {ordersList.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth size="small">
        <InputLabel>Страна</InputLabel>
        <Select label="Страна" onChange={handleChange}>
          {data.countries.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.country}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth size="small">
        <InputLabel>Жанр</InputLabel>
        <Select label="Жанр" onChange={handleChange}>
          {data.genres.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.genre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth size="small">
        <InputLabel>Год</InputLabel>
        <Select label="Год" onChange={handleChange}>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>

      <Box>
        <Button variant="outlined">Сбросить</Button>
      </Box>
    </Stack>
  );
};

export default SelectMovies;
