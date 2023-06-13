import styled from "styled-components";


export const CreateCommunityStyled = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${(props) => props.theme.color.grey};
    border-radius: 15px;
    padding-right: 15px;
    margin-bottom: 35px;
    height: 80px;

    input, label {
        font-size: 24px;
    }
`
