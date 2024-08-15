import React from "react";

import { StatisticStyled } from "./styled";
import { Flex } from "@shared/ui";
import { useGetCommunityStatisticQuery } from '@entities/community';
import { StatisticTitleStyled } from "./styled";


interface ICommunityStatisticProps {
    title: string
}

export const CommunityStatistic: React.FC<ICommunityStatisticProps> = ({ title }) => {
    const {data, isLoading} = useGetCommunityStatisticQuery(title);

    return (
        <StatisticStyled>
            <Flex alignItems="flex-start" justifyContent="flex-start" flexDirection="column">
                <StatisticTitleStyled>Статистика</StatisticTitleStyled>
                { isLoading
                ? 'loading'
                : <div>
                    <Flex alignItems="center" justifyContent="space-between">Подписчики: {data.subscribers}</Flex>
                    <Flex alignItems="center" justifyContent="space-between">Публикации: {data.publications}</Flex>
                </div>} 
            </Flex>
        </StatisticStyled>
    )
}
