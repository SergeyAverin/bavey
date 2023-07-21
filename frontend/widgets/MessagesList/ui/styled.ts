import styled from "styled-components";


export const MessageListStyled = styled.div`
    height: 550px;
    overflow-y: auto;
`
export const SendInput = styled.input`
    background: ${props=>props.theme.color.grey};
    border: 4px solid ${props=>props.theme.color.black};
    border-radius: 15px 0 0 15px;
    padding: 15px;
    width: 70%;
    color: ${props=>props.theme.color.white};
`

export const SendSubmit = styled.input`
    background: ${props=>props.theme.color.grean};
    border: 4px solid ${props=>props.theme.color.grean};
    color: ${props=>props.theme.color.black};
    padding: 15px;
    border-radius: 0 15px 15px 0;
`