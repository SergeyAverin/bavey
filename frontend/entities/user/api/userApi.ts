import { IUser } from '../model/types'
import { baseApi } from '@shared/api'
import { TAGS } from '@shared/api'
import { IPublication } from '@entities/publication'

interface IUserApiResult {
  user: IUser;
}

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<IUserApiResult, string>({
      query: (username) => ({
        url: `blog_api/user/${username}`
      }),
      providesTags: [TAGS.USERS]
    }),

    getUserStatistic: builder.query<IUserApiResult, string>({
      query: (username) => ({
        url: `blog_api/user/${username}/statistic`
      }),
      providesTags: [TAGS.USERS]
    }),

    getPublicationList: builder.query<IPublication[], any>({
      query: (req) => {
        return {
          url: `blog_api/user/${req.username}/publications`
        }
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ publication }) => ({
                type: TAGS.PUBLICATIONS,
                id: publication.slug
              })),
              { type: TAGS.PUBLICATIONS, id: 'LIST' }
            ]
          : [{ type: TAGS.PUBLICATIONS, id: 'LIST' }]
    })
  })
})

export const {
  useGetUserQuery,
  useGetPublicationListQuery,
  useGetUserStatisticQuery
} = userApi
