import { IRelations } from '../model/types'
import { baseApi, TAGS } from '@shared/api'

export const relationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRelation: builder.query<IRelations, string>({
      query: (username) => ({
        url: `relations_api/relations?username=${username}`
      }),
      providesTags: [TAGS.RELATIONS]
    }),

    getRelationStatus: builder.query<string, string>({
      query: (username) => ({
        url: `relations_api/relations/${username}/status`
      }),
      providesTags: [TAGS.RELATIONS]
    })
  })
})

export const { useGetRelationQuery, useGetRelationStatusQuery } = relationApi
