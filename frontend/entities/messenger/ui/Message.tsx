import React from "react";
import Link from "next/link";

import { MessageStyled } from "@entities/messenger/ui/styled";


export const Message = ({message, isSender}) => {
    return (
        <MessageStyled isSender={isSender}>
                { message }
        </MessageStyled>
    )
}
