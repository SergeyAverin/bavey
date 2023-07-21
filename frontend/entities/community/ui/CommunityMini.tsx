import React from "react";
import Image from "next/image";
import Link from "next/link";

import { imageLoader } from "@shared/lib";
import { ICommunity } from "../model/types";
import  { Flex, Margin } from "@shared/ui";
import { CommunityMiniStyled } from './styled';


interface ICommunityMiniProps {
    community: ICommunity,
}

export const CommunityMini: React.FC<ICommunityMiniProps> = ({ community }) => {
    return (
        <CommunityMiniStyled>
            <Link href={'/community/'  + community.title}>
                <Flex justifyContent="flex-start" alignItems="center">
                    <Image loader={imageLoader} src={community.community_avatar} alt={community.title} width={50} height={50}/>
                    <Margin ml={8}>
                        { community.title }
                    </Margin>
                </Flex>
            </Link>
        </CommunityMiniStyled>
    )
};
