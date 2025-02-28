import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const kinopoiskApiKey = import.meta.env.VITE_KINOPOISK_KEY;

const excludeGenres = [25, 29, 30, 32];

export const kinopoiskApi = createApi({
  reducerPath: 'kinopoiskApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://kinopoiskapiunofficial.tech/api',
    prepareHeaders: (headers) => {
      headers.set('X-API-KEY', kinopoiskApiKey);
      headers.set('Content-Type', 'application/json');
    },
  }),
  endpoints: (builder) => ({
    getFilmsTop: builder.query({
      query: ({ type, page }) =>
        `/v2.2/films/collections?type=${type}&page=${page}`,
    }),

    getFilms: builder.query({
      query: ({
        countries = '',
        genres = '',
        order = 'RATING',
        type = 'ALL',
        year = '',
        page = 1,
      }) =>
        `/v2.2/films?genres=${genres}&countries=${countries}&order=${order}&type=${type}&page=${page}&yearFrom=${year}&yearTo=${year}`,
    }),

    getGenresAndCountries: builder.query({
      query: () => '/v2.2/films/filters',
      transformResponse: (response) => ({
        ...response,
        genres: response.genres.filter(
          (item) => !excludeGenres.includes(item.id),
        ),
      }),
    }),
  }),
});

export const {
  useGetFilmsTopQuery,
  useGetFilmsQuery,
  useGetGenresAndCountriesQuery,
} = kinopoiskApi;
