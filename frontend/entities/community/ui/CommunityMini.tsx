import { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { CommunityMiniStyled } from './styled'
import { ICommunity } from '../model/types'
import { imageLoader } from '@shared/lib'
import { Flex, Margin } from '@shared/ui'

interface ICommunityMiniProps {
  community: ICommunity;
}

export const CommunityMini: FC<ICommunityMiniProps> = ({ community }) => {
  return (
    <CommunityMiniStyled>
      <Link href={`/community/${community.title}`}>
        <Flex justifyContent="flex-start" alignItems="center">
          <Image
            loader={imageLoader}
            src={community.community_avatar}
            alt={community.title}
            width={50}
            height={50}
          />
          <Margin ml={8}>{community.title}</Margin>
        </Flex>
      </Link>
    </CommunityMiniStyled>
  )
}
