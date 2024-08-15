import React from "react";

import { FeedFillterStyled, FeedFillterItemStyled } from "@widgets/navigationsSideBars/ui/styled";


export const FeedFillter = ({setFillter, fillter}) => {
    return (
        <FeedFillterStyled>
            <FeedFillterItemStyled isActive={fillter=='time'}  onClick={() => setFillter('time')}>Сортировка по времени</FeedFillterItemStyled>
            <FeedFillterItemStyled isActive={fillter=='feed'} onClick={() => setFillter('feed')}>Рекомендации</FeedFillterItemStyled>
        </FeedFillterStyled>
    )
}
