import { baseApi } from '../../../shared/api';

import { ICommunity } from 'types/user';


export const messagesListApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getMessenges: builder.query<[ICommunity], string>({
      query: (slug) => ({
        url: `messenger_api/chats/${slug}`
      }),
      providesTags: ['Chat'],
    }),

    getMessengesUpdata: builder.mutation<any, string>({
      query(slug) {
        return {
          url: `messenger_api/chats/${slug}`,
          method: 'GET'
        };
      },
      invalidatesTags: ['Chat']
    }),

  })
})

export const {
    useGetMessengesQuery,
    useGetMessengesUpdataMutation
} = messagesListApi;
    