import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const workingApi = createApi({
  reducerPath: 'workingApi',
  baseQuery: fetchBaseQuery({baseUrl: 'https://pokeapi.co/api/v2/'}),
  endpoints: builder => ({
    getWorking: builder.query({
      query: name => `pokemon/${name}`,
    }),
  }),
});

export const {useGetWorkingQuery} = workingApi;
