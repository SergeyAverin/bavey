import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { RelationStyled, UserName, UserInfo, UserSendMessage } from './styled'
import { imageLoader } from '@shared/lib'
import { Margin } from '@shared/ui'

interface IRelation {
  username: string;
  avatar: string;
  RemoveFriendButtonSlot: React.ReactNode;
}

export const Relation: React.FC<IRelation> = ({
  username,
  avatar,
  RemoveFriendButtonSlot
}) => {
  return (
    <RelationStyled>
      <Image
        loader={imageLoader}
        src={avatar}
        alt={username}
        width={90}
        height={90}
      />
      <UserInfo>
        <UserName>
          <Link href={`/user/${username}`}>{username}</Link>
        </UserName>
        <UserSendMessage href={`/messenger/`}>SendMessage</UserSendMessage>
        <Margin mt={10}>{RemoveFriendButtonSlot}</Margin>
      </UserInfo>
    </RelationStyled>
  )
}
