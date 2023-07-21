import { baseApi } from '../../../shared/api';


export const CreateCommunityApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    createCommunity: builder.mutation<any, string>({
        query(title) {
          return {
            url: `blog_api/community/`,
            method: 'POST',
            body: {
                title: title
            }
          }
        },
        invalidatesTags: ['Community']
    }),


  })
})

export const {
  useCreateCommunityMutation
} = CreateCommunityApi;
