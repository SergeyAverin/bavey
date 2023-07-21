import React from "react";
import Link from "next/link";

import { ChatStyled } from "@entities/messenger/ui/styled";
import { useRouter } from "next/router";


export const Chat = ({username, slug}) => {
    const router = useRouter();
    const activSlug = router.query.slug;
    const isActive = activSlug == slug;
    console.log(router.pathname)
    return (
        <a href={`/messenger/${slug}`}>
            <ChatStyled isActive={isActive}>
                {username}
            </ChatStyled>
        </a>
    )
}
