import {createApi} from '@reduxjs/toolkit/query/react';
import {db} from 'src/utilities/firebase';
import {BaseQueryFn} from '@reduxjs/toolkit/query';

const firebaseQuery = (): BaseQueryFn<
  {collection: string},
  {b: number},
  {message: string}
> => {
  return async ({collection}, api) => {
    console.log(`This is ${collection} ${api.type}`);
    return {data: {b: 1}};
    // return {error: {message: 'this iserror.'}};
  };
};

export const firebaseApi = createApi({
  reducerPath: 'firebaseApi',
  baseQuery: firebaseQuery(),
  endpoints: builder => ({
    getDocument: builder.query<{b: number}, string>({
      query: collectionName => ({collection: collectionName}),
    }),
    setDocument: builder.mutation({
      query: collectionName => ({collection: collectionName}),
    }),
  }),
});

export const {useGetDocumentQuery} = firebaseApi;
