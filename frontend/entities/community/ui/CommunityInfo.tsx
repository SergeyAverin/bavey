import React from "react";
import Image from "next/image";

import { ICommunity } from "../model/types";
import { CommunityInfoStyled, CommunityInfoTitleStyled, CommunityInfoContentStyled } from "./styled";
import { Flex, Margin } from "@shared/ui";
import { imageLoader } from "@shared/lib";
import { UnsubscriptionButton, SubscriptionButton, useGetSubscribQuery } from "@features/communityButton";
import { Wrapper } from "@shared/ui";


interface ICommunityInfo {
    community: ICommunity
}

export const CommunityInfo: React.FC<ICommunityInfo>  = ({ community }) => {
    const { data, isLoading } = useGetSubscribQuery(community.title);

    return (
        <CommunityInfoStyled>
            <Wrapper>
                <CommunityInfoContentStyled>
                    <Flex alignItems="center" justifyContent="flex-start">
                        <Image
                            src={community.community_avatar}
                            alt={ community.title }
                            loader={imageLoader}
                            width={150}
                            height={150}
                        />
                        <Margin ml={20}>
                            <CommunityInfoTitleStyled>
                                { community.title }
                            </CommunityInfoTitleStyled>
                            { community.description }
                        </Margin>
                    </Flex>
                    <Flex alignItems="center" justifyContent="flex-start" flexDirection="column">
                    { !isLoading && data.relationship_type == 'subscriber' &&
                        <UnsubscriptionButton title={community.title} />
                    }
                    { !isLoading && data.relationship_type == 'subscribe' &&
                        <SubscriptionButton title={community.title} />
                    }
                    </Flex>
                    
                </CommunityInfoContentStyled>
            </Wrapper>
        </CommunityInfoStyled>
    )
}
