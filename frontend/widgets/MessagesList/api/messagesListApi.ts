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

  })
})

export const {
    useGetMessengesQuery,
} = messagesListApi;
    