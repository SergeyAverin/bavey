import styled, { css } from "styled-components"


export const NavigationSideBarStyled = styled.div`
    padding: 25px;
    background: ${(props) => props.theme.color.grey };
    border-radius: 15px;
`;
export const FeedFillterStyled = styled.div`
    padding: 15px;
    background: ${(props) => props.theme.color.grey };
    border-radius: 15px;
    width: 60%;
    margin: auto;
    margin-bottom: 30px;
    display: flex;
`;
export const FeedFillterItemStyled = styled.div`
    padding: 15px;
    background: ${(props) => props.theme.color.grey };
    border-radius: 15px;
    border: 2px solid ${(props) => props.theme.color.white };
    margin-right: 14px;
    cursor: pointer;
    ${props => props.isActive && css`
        background: ${(props) => props.theme.color.black };
        border: 2px solid ${(props) => props.theme.color.black };
    `}
`;