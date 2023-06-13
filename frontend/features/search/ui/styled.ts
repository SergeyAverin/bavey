import styled from "styled-components";


export const SearchInput = styled.input`
    background: ${(props) => props.theme.color.black};
    border: 2px solid ${(props) => props.theme.color.grey};
    color: ${(props) => props.theme.color.white};
    border-radius: 15px;
    padding: 8px;
    padding-top: 10px;
    padding-bottom: 10px;
    outline: none;
`;
