import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './baseQuery'
import { HYDRATE } from 'next-redux-wrapper';


export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQuery,
  tagTypes: ['Relation', 'FriendRequests', 'Voice', 'Statistic', 'Publication', 'Community'],
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },

  endpoints: () => ({}),
});
