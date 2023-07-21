import { baseApi } from '../../../shared/api'
import { IUser } from '../model/types'
import { IPublication } from '@entities/publication'


interface IUserApiResult {
    user: IUser
}

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getUser: builder.query<IUserApiResult, string>({
      query: (username) => ({
        url: `blog_api/user/${username}`
      })
    }),

    getUserStatistic: builder.query<IUserApiResult, string>({
      query: (username) => ({
        url: `blog_api/user/${username}/statistic`
      }),
      providesTags: ['Statistic']
    }),
    
    getPublicationList: builder.query<IPublication[], any>({
      query: (req) => {
        return {
        url: `blog_api/user/${req.username}/publications`,
      }},
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
  useGetUserQuery,
  useGetPublicationListQuery,
  useGetUserStatisticQuery,
} = userApi
