import { useViewer } from "@entities/viewer";
import { SendInput, SendSubmit } from "@widgets/MessagesList/ui/styled";
import React, { useEffect, useState } from "react";


export const SendMessage = ({ slug }) => {
    const viewerContext = useViewer();
    const username = viewerContext.authViewer.user.username;
    const token = viewerContext.authViewer.token;
    const [message, setMessage] = useState('')
    const [socket, setSocket] = useState(null);
   
    useEffect(() => {
        const ws = new WebSocket(`ws://127.0.0.1:8080/ws/chat/${slug}/`);
        
        ws.onopen = () => {
          console.log('WebSocket connection established');
        };
    
        ws.onclose = () => {
          console.log('WebSocket connection closed');
        };
    
        setSocket(ws);
    
        return () => {
          ws.close();
        };
      }, [slug]);


    const submitHeandler = (event) => {
        event.preventDefault();
        
        const data = {
            "message": message,
            "token": token,
            "user": {
                "username": username
            }
        }
        console.log(data)
        const json = JSON.stringify(data);
        socket.send(json)
    }
    return (
        <form onSubmit={submitHeandler}>
            <SendInput   onInput={(event:React.ChangeEvent<HTMLInputElement>) => setMessage(event.target.value)} value={message}></SendInput>
            <SendSubmit type="submit" value={'отправить'} />
        </form>
    )
}