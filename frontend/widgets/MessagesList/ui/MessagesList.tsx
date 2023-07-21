import React, { useEffect, useRef, useState } from "react";

import { Message } from '@entities/messenger/ui/Message';
import { useGetMessengesQuery, useGetMessengesUpdataMutation } from "@widgets/MessagesList/api/messagesListApi";
import { useViewer } from "@entities/viewer";
import { MessageListStyled } from "@widgets/MessagesList/ui/styled";
import { SendMessage } from "@widgets/MessagesList/ui/sendMessage";


export const MessagesList: React.FC = (props) => {
    const { data, isLoading } = useGetMessengesQuery(props.slug);
    const [update] = useGetMessengesUpdataMutation();
    const viewerContext = useViewer();
    const username = viewerContext.authViewer.user.username;
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current.scrollTop = bottomRef.current.scrollHeight;
    }, [isLoading]);
    const [ newMessage, setNewMessage ] = useState([])
    const [socket, setSocket] = useState(null);

    const chat = props.slug;
    useEffect(() => {
        const ws = new WebSocket(`ws://127.0.0.1:8080/ws/chat/${props.slug}/`);
        
        ws.onopen = () => {
          console.log('WebSocket connection established');
        };
    
        ws.onmessage = (event) => {
          update(props.slug)
          bottomRef.current.scrollTop = bottomRef.current.scrollHeight;

        };
        ws.onclose = () => {
          console.log('WebSocket connection closed');
        };
    
        setSocket(ws);
    
        return () => {
          ws.close();
        };
      }, [isLoading]);

    return (
      <>
       <MessageListStyled ref={bottomRef}>
            { !isLoading &&
                data.map((item) => <Message key={item.user.username} message={item.message} isSender={item.user.username==username}></Message>)
            }
        </MessageListStyled>
          <SendMessage slug={props.slug} />
      </>
       

    )
}

/*
    { !isLoading &&
                newMessage.map((item) => <Message key={item.message} message={item.message} isSender={item.user.username==username}></Message>)
            }
*/