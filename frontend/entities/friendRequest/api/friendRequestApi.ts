import { type IFriendRequest } from '../model/types'
import { baseApi, TAGS } from '@shared/api'

interface IFriendReqrusetsApiResult {
  outside: [IFriendRequest];
  inside: [IFriendRequest];
}

export const friendRequestApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFriendRequests: builder.query<IFriendReqrusetsApiResult, void>({
      query: () => ({
        url: `relations_api/friend_requests`
      }),
      providesTags: [TAGS.FRIEND_REQUESTS]
    })
  })
})

export const { useGetFriendRequestsQuery } = friendRequestApi
