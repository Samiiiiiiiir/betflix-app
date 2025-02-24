import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const kinopoiskApi = createApi({
  reducerPath: 'kinopoiskApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://kinopoiskapiunofficial.tech/api',
  }),
  endpoints: (builder) => ({
    getFilmsTop: builder.query({
      query: (type, page) =>
        `/v2.2/films/collections&type=${type}&page=${page}`,
    }),
  }),
});

export const { useGetFilmsTopQuery } = kinopoiskApi;
