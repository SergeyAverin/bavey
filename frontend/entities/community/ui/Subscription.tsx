import { FC, ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { SubscriptionStyled, SubscriptionTitleStyled } from './styled'
import { ICommunity } from '../model/types'
import { imageLoader } from '@shared/lib'
import { Flex } from '@shared/ui'

interface ISubscriptionProps {
  community: ICommunity;
  communitySubscribeButton: ReactNode;
}

export const Subscription: FC<ISubscriptionProps> = ({
  community,
  communitySubscribeButton
}) => {
  return (
    <SubscriptionStyled>
      <Flex justifyContent="flex-start" alignItems="center">
        <Image
          src={community.community_avatar}
          loader={imageLoader}
          alt={community.title}
          width={80}
          height={80}
        />
        <Link href={`/community/${community.title}`}>
          <SubscriptionTitleStyled>{community.title}</SubscriptionTitleStyled>
        </Link>
      </Flex>
      {communitySubscribeButton}
    </SubscriptionStyled>
  )
}
