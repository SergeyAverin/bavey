import { TAGS, baseApi } from '@shared/api'

export const publicationCreatorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    deletePublication: builder.mutation<any, string>({
      query(slug) {
        return {
          url: `blog_api/publications/${slug}`,
          method: 'DELETE'
        }
      },
      invalidatesTags: (result, error, slug) => [
        { type: TAGS.PUBLICATIONS, id: slug }
      ]
    })
  })
})

export const { useDeletePublicationMutation } = publicationCreatorApi
