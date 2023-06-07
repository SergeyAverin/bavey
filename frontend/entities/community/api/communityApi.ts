import { baseApi } from '../../../shared/api';

import { ICommunity } from 'types/user';


export const communityApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getCommunityList: builder.query<[ICommunity], void>({
        query() {
          return {
            url: `blog_api/community/`
          };
        },
        providesTags: (result) =>
        // is result available?
        result
          ? // successful query
            [
              ...result.map(({ title }) => ({ type: 'Community', id: title})),
              { type: 'Community', id: 'LIST' },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
            [{ type: 'Community', id: 'LIST' }],
    }),

  })
})

export const {
    useGetCommunityListQuery
} = communityApi;
    