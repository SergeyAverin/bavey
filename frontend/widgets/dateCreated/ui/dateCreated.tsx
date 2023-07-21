import React from "react";

import { StatisticStyled } from "./styled";
import { Flex } from "@shared/ui";
import { useGetUserStatisticQuery } from '@entities/user';
import { StatisticTitleStyled } from "./styled";


interface IDateCreatedProps {
    date: string
}

export const DateCreated: React.FC<IDateCreatedProps> = ({ date }) => {
    return (
        <StatisticStyled>
            <Flex alignItems="flex-start" justifyContent="flex-start" flexDirection="column">
                <StatisticTitleStyled>Дата создание: </StatisticTitleStyled>
                <div>
                    { date }
                </div>
            </Flex>
        </StatisticStyled>
    )
}
