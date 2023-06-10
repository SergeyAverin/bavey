import styled from "styled-components";


export const CommunityInfoStyled = styled.div`
    background: ${(props) => props.theme.color.grey};
    padding-top: 50px;
    padding-bottom: 50px;
`;

export const CommunityInfoContentStyled = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const CommunityInfoTitleStyled = styled.h1`
    font-weight: 700;
    font-size: 28px;
    line-height: 30px;
`

export const SubscriptionStyled = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: ${(props) => props.theme.color.grey};
    border-radius: 15px;
    padding: 25px;
`

export const SubscriptionTitleStyled = styled.div`
    font-size: 24px;
    margin-left: 15px;
    color: ${(props) => props.theme.color.grean};
    cursor: pointer;
`
