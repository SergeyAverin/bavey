import { baseApi } from '../../../shared/api';


export const friendRequestButtonApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    subscription: builder.mutation<any, string>({
        query(title) {
          return {
            url: `blog_api/community/${title}/subscribers`,
            method: 'POST'
          };
        },
        invalidatesTags: ['Community', 'Statistic']
    }),

    unsubscription: builder.mutation<any, string>({
        query(title) {
          return {
            url: `blog_api/community/${title}/subscribers`,
            method: 'DELETE'
          };
        },
        invalidatesTags: ['Community', 'Statistic']
    }),

    getSubscrib: builder.query<string, string>({
      query: (title) => ({
        url: `blog_api/community/${title}/subscribers`
      }),
      providesTags: ['Community']
    }),

  })
})

export const {
  useSubscriptionMutation,
  useUnsubscriptionMutation,
  useGetSubscribQuery
} = friendRequestButtonApi;
