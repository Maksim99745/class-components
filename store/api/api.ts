import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CharactersData } from '../../components/models/character';

const API_URL = `https://swapi.dev/api/people/`;

export const api = createApi({
  reducerPath: 'api',
  tagTypes: ['Characters'],
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  endpoints: (builder) => ({
    getCharacterByName: builder.query<CharactersData, string>({
      query: (queryString: string) => `/?search=${queryString}`,
    }),
    getCharactersByPage: builder.query<CharactersData, string>({
      query: (pageNumber: string) => `/?page=${pageNumber}`,
    }),
  }),
});

export const { useGetCharacterByNameQuery, useGetCharactersByPageQuery } = api;
