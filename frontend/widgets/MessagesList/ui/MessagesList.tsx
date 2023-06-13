import React, { useEffect, useRef, useState } from "react";

import { Message } from '@entities/messenger/ui/Message';
import { useGetMessengesQuery } from "@widgets/MessagesList/api/messagesListApi";
import { useViewer } from "@entities/viewer";
import { MessageListStyled } from "@widgets/MessagesList/ui/styled";


export const MessagesList: React.FC = (props) => {
    const { data, isLoading } = useGetMessengesQuery(props.slug);
    const viewerContext = useViewer();
    const username = viewerContext.authViewer.user.username;
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current.scrollTop = bottomRef.current.scrollHeight;
    }, [isLoading]);
    const [ newMessage, setNewMessage ] = useState([])
    const [socket, setSocket] = useState(null);

    const chat = props.slug
    useEffect(() => {
        const ws = new WebSocket(`ws://127.0.0.1:8080/ws/chat/${chat}/`);
        
        ws.onopen = () => {
          console.log('WebSocket connection established');
        };
    
        ws.onmessage = (event) => {
            console.log(event.data);
            console.log('---event.data');

            setNewMessage((prev) => prev.push(event.data));  
            console.log('--newMessage')
            console.log(newMessage)
        };
    
        ws.onclose = () => {
          console.log('WebSocket connection closed');
        };
    
        setSocket(ws);
    
        return () => {
          ws.close();
        };
      }, []);

    return (
        <MessageListStyled ref={bottomRef}>
            { !isLoading &&
                data.map((item) => <Message key={item.user.username} message={item.message} isSender={item.user.username==username}></Message>)
            }
        
        </MessageListStyled>
    )
}

/*
    { !isLoading &&
                newMessage.map((item) => <Message key={item.message} message={item.message} isSender={item.user.username==username}></Message>)
            }
*/