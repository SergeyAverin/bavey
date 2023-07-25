import { ICommunity, ICommunityStatistic } from '../model/types'
import { baseApi, TAGS } from '@shared/api'
import { IPublication } from '@entities/publication'

export const communityApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCommunity: builder.query<ICommunity, string>({
      query: (title) => ({
        url: `blog_api/community/${title}`
      }),
      providesTags: [TAGS.COMMUNITIES]
    }),

    getCommunityList: builder.query<[ICommunity], void>({
      query: () => ({
        url: `blog_api/community/`
      }),
      providesTags: [TAGS.COMMUNITIES]
    }),

    getCommunityPublicationList: builder.query<IPublication[], string>({
      query: (title) => {
        return {
          url: `blog_api/community/${title}/publications`
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
    }),

    getCommunityStatistic: builder.query<ICommunityStatistic, string>({
      query: (title) => ({
        url: `blog_api/community/${title}/statistic`
      }),
      providesTags: [TAGS.COMMUNITIES]
    })
  })
})

export const {
  useGetCommunityQuery,
  useGetCommunityPublicationListQuery,
  useGetCommunityListQuery,
  useGetCommunityStatisticQuery
} = communityApi
