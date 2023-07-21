import { baseApi } from '../../../shared/api';


interface IupdateSettingsArgs {
    slug: string,
    body: FormData
}

export const settingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    updateUserSettings: builder.mutation<any, IupdateSettingsArgs>({
        query({ slug, body }) {
          return {
            url: `blog_api/user/${slug}`,
            method: 'PATCH',
            body: body,
          };
        }
    }),

    updateCommunitySettings: builder.mutation<any, IupdateSettingsArgs>({
      query({ slug, body }) {
        return {
          url: `blog_api/community/${slug}`,
          method: 'PATCH',
          body: body,
        };
      }
    }),

    selectAdimns: builder.mutation<any, any>({
      query({ title, admins }) {
        return {
          url: `blog_api/community/${title}/admins`,
          method: 'POST',
          body: {
            admins: admins
          },
        };
      }
    }),

    getAdmins: builder.query<any, any>({
        query(title) {
          return {
            url: `blog_api/community/${title}/admins`
          };
        }
    }),

  })
})

export const {
    useUpdateUserSettingsMutation,
    useUpdateCommunitySettingsMutation,
    useSelectAdimnsMutation,
    useGetAdminsQuery
} = settingApi;
    