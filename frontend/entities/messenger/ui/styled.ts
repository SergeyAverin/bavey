import styled, { css } from "styled-components";


export const ChatStyled = styled.div`
    background: ${(props)=>props.theme.color.grey};
    font-size: 24px;
    border-top: 2px solid ${(props)=>props.theme.color.white};
    border-top: 2px solid ${(props)=>props.theme.color.white};
    padding: 15px;
    cursor: pointer;

    ${props => props.isActive && css`
        background: ${(props)=>props.theme.color.black};
    `}
`;

export const MessageStyled = styled.div`
    background: ${(props)=>props.theme.color.black};
    font-size: 18px;
    padding: 15px;
    width: 50%;
    margin-bottom: 15px;
    border-radius: 15px;
    ${props => props.isSender && css`
        justify-self: flex-end;
        right: 0;
        margin-left: 40%;

    `}
`

export const MessagesStyled = styled.div`
    display: flex;
    flex-direction: column;  
    width: 100%;
    position: relative;
`;