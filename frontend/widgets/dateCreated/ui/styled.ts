import styled from "styled-components"

export const StatisticStyled = styled.div`
    border-radius: 15px;
    background: ${(props) => props.theme.color.grey};   
    padding: 15px;
`

export const StatisticTitleStyled = styled.div`
    font-size: 18px;
    color: ${(props) => props.theme.color.white};
    font-weight: bold;
    margin-bottom: 10px;
`
