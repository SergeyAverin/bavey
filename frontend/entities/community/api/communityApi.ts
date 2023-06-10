import { IPublication } from '@entities/publication';
import { baseApi } from '../../../shared/api';

import { ICommunity } from 'types/user';


export const communityApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getCommunity: builder.query<ICommunity, string>({
      query: (title) => ({
        url: `blog_api/community/${title}`
      })
    }),

    getCommunityList: builder.query<any, void>({
      query: () => ({
        url: `blog_api/community/`
      })
    }),

    getCommunityPublicationList: builder.query<IPublication[], any>({
      query: (req) => {
        return {
        url: `blog_api/community/${req.title}/publications`,
        
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

    getCommunityStatistic: builder.query<any, string>({
      query: (title) => ({
        url: `blog_api/community/${title}/statistic`
      }),
      providesTags: ['Statistic']
    }),

  })
})

export const {
    useGetCommunityQuery,
    useGetCommunityPublicationListQuery,
    useGetCommunityListQuery,
    useGetCommunityStatisticQuery
} = communityApi;
    