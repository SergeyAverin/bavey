import { baseApi } from '../../../shared/api';


interface IDeletePublicationArgs {
    slug: string
}

export const publicationCreatorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    deletePublication: builder.mutation<any, IDeletePublicationArgs>({
        query({ slug }) {
          return {
            url: `blog_api/publications/${slug}`,
            method: 'DELETE'
          };
        },
        invalidatesTags: (result, error, { slug }) => [{ type: 'Publication', id: slug }]
    }),

  })
})

export const {
    useDeletePublicationMutation
} = publicationCreatorApi;
    