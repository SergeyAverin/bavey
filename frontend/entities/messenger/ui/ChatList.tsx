import React, { useEffect } from "react";

import { Chat } from "@entities/messenger/ui/Chat";
import { useGetChatsQuery } from "@entities/messenger/api/chatApi";
import { useViewer } from "@entities/viewer";
import { useRouter } from "next/router";


export const ChatList = () => {
    const { data, isLoading } = useGetChatsQuery();
    const viewerContext = useViewer();
    const usernameViewer = viewerContext.authViewer.user.username;


    const getUsername = (usersInChat) => {
        for (const user of usersInChat) {
            if (user.username != usernameViewer) {
                return user.username
            }
        }
    }

    return (
        <div>
            {!isLoading &&
                data.map((item) => <Chat slug={item.slug} username={getUsername(item.users_in_chat)}/>)
            }
            {!isLoading && data.length == 0&& 
                <h2>Нет чатов</h2>
            }
        </div>
    )
}
