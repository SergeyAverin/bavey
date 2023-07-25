import { FC, ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { FriendRequestStyled } from './styled'
import { IFriendRequest } from '../model/types'
import { Margin, Flex } from '@shared/ui'
import { imageLoader } from '@shared/lib'

interface IFriendRequestInsideProps {
  friendRequest: IFriendRequest;
  acceptButtonSlot: ReactNode;
  rejectButtonSlot: ReactNode;
}

export const FriendRequestInside: FC<IFriendRequestInsideProps> = ({
  friendRequest,
  acceptButtonSlot,
  rejectButtonSlot
}) => {
  return (
    <FriendRequestStyled>
      <Image
        src={friendRequest.sender.avatar}
        alt={friendRequest.sender.username}
        width={90}
        height={90}
        loader={imageLoader}
      />
      <Margin ml={30}>
        <h2>
          <Link href={`/user/${friendRequest.sender.username}`}>
            {friendRequest.sender.username}
          </Link>
        </h2>
        <p>{friendRequest.message}</p>
        <Flex alignItems="center" justifyContent="flex-start">
          {acceptButtonSlot}
          <Margin ml={20}>{rejectButtonSlot}</Margin>
        </Flex>
      </Margin>
    </FriendRequestStyled>
  )
}
