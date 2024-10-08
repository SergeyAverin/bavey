import styled from "styled-components"


interface iSetVoiceCountStyledProps {
    isEnable: boolean
}

export const SetVoiceCountStyled = styled.div<iSetVoiceCountStyledProps>`
    margin-left: 5px;
    color: ${(props) => props.isEnable ? props.theme.color.grean : props.theme.color.white};
`;
