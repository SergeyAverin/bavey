import React from "react";

import { StatisticStyled } from "./styled";
import { Flex } from "@shared/ui";
import { useGetUserStatisticQuery } from '@entities/user';
import { StatisticTitleStyled } from "./styled";


interface IUserStatisticProps {
    username: string
}

export const UserStatistic: React.FC<IUserStatisticProps> = ({ username }) => {
    const {data, isLoading} = useGetUserStatisticQuery(username);

    return (
        <StatisticStyled>
            <Flex alignItems="flex-start" justifyContent="flex-start" flexDirection="column">
                <StatisticTitleStyled>Статистика</StatisticTitleStyled>
                { isLoading
                ? 'loading'
                : <div>
                    <Flex alignItems="center" justifyContent="space-between">Друзья: {data.friends}</Flex>
                    <Flex alignItems="center" justifyContent="space-between">Подписчики: {data.subscribers}</Flex>
                    <Flex alignItems="center" justifyContent="space-between">Подписки: {data.subscriptions}</Flex>
                    <Flex alignItems="center" justifyContent="space-between">Публикации: {data.publications}</Flex>
                </div>} 

            </Flex>
        </StatisticStyled>
    )
}
