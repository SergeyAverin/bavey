import { baseApi } from '../../../shared/api';


interface IupdateSettingsArgs {
    slug: string,
    body: FormData
}

export const settingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    updateSettings: builder.mutation<any, IupdateSettingsArgs>({
        query({ slug, body }) {
          return {
            url: `blog_api/user/${slug}`,
            method: 'POST',
            body: body,
          };
        },
        invalidatesTags: ['Statistic']
    }),

  })
})

export const {
    useUpdateSettingsMutation
} = settingApi;
    