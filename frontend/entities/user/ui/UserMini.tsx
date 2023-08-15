import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { UserMiniStyled } from './styled'
import { IUser } from '../model/types'
import { imageLoader } from '@shared/lib'
import { Flex, Margin } from '@shared/ui'

interface IUserMiniProps {
  user: IUser;
}

export const UserMini: React.FC<IUserMiniProps> = ({ user }) => {
  return (
    <UserMiniStyled>
      <Link href={`/user/${user.username}`}>
        <Flex justifyContent="flex-start" alignItems="center">
          <Image
            loader={imageLoader}
            src={user.avatar}
            alt={user.username}
            width={50}
            height={50}
          />
          <Margin ml={8}>{user.username}</Margin>
        </Flex>
      </Link>
    </UserMiniStyled>
  )
}
