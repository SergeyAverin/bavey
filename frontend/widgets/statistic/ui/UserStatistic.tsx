import React from "react";

import { StatisticStyled } from "./styled";
import { Flex } from "@shared/ui";
import { useGetUserStatisticQuery } from '@entities/User';
import { StatisticTitleStyled } from "./styled";


interface IUserStatisticProps {
    username: string
}

export const UserStatistic: React.FC<IUserStatisticProps> = ({ username }) => {
    const {data, isLoading} = useGetUserStatisticQuery(username);
    console.log(data)
    return (
        <StatisticStyled>
            <Flex alignItems="flex-start" justifyContent="flex-start" flexDirection="column">
                <StatisticTitleStyled>Statistic</StatisticTitleStyled>
                { isLoading
                ? 'loading'
                : <div>
                    <Flex alignItems="center" justifyContent="space-between">Friends: {data.friends}</Flex>
                    <Flex alignItems="center" justifyContent="space-between">Subscriptions: {data.subscriptions}</Flex>
                    <Flex alignItems="center" justifyContent="space-between">Subscribercs: {data.subscribers}</Flex>
                    <Flex alignItems="center" justifyContent="space-between">publications: {data.publications}</Flex>
                </div>}

            </Flex>
        </StatisticStyled>
    )
}
