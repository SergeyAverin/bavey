import { baseApi } from '@shared/api'
import { IUser } from '@entities/user/model/types'
import { IPublication } from '@entities/publication'


interface IUserApiResult {
    user: IUser
}

export const feedApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getPublicationFeed: builder.query<IPublication[], number>({
      query: (page) => {
        return {
        url: `feed_api/publications`,
      }},
      // Only have one cache entry because the arg always maps to one string
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName
      },
      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems) => {
        currentCache.push(...newItems);
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg
      },
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
            [
              ...result.map(({ publication }) => ({ type: 'Publication', id: publication.slug})),
              { type: 'Publication', id: 'LIST' },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
            [{ type: 'Publication', id: 'LIST' }],
    }),

    getPublicationFeedTiem: builder.query<IPublication[], number>({
      query: (page) => {
        return {
        url: `feed_api/publications/time?page=${page}`,
      }},
      // Only have one cache entry because the arg always maps to one string
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName
      },
      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems) => {
        currentCache.push(...newItems);
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg
      },
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
            [
              ...result.map(({ publication }) => ({ type: 'Publication', id: publication.slug})),
              { type: 'Publication', id: 'LIST' },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
            [{ type: 'Publication', id: 'LIST' }],
    }),
    
  })
})

export const {
  useGetPublicationFeedQuery,
  useGetPublicationFeedTiemQuery
} = feedApi
