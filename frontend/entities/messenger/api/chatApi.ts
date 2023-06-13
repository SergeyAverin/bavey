import { baseApi } from '../../../shared/api';
    

export const chatApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getChats: builder.query<any, void>({
      query: () => ({
        url: `messenger_api/chats`
      }),
      providesTags: ['Chat'],
    }),
  })
})

export const {
    useGetChatsQuery,
} = chatApi;
    