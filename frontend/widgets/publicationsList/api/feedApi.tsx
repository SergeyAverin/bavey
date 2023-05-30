import { baseApi } from '@shared/api'
import { IUser } from '@entities/User/model/types'
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
      }
    }),
    
  })
})

export const {
  useGetPublicationFeedQuery,
} = feedApi
