import styled from 'styled-components';


export const PublicationStyle = styled.div`
    background: ${props => props.theme.color.grey};
    border-radius: 16px;
    padding: 25px 0px 25px 0px;
`;

export const PublicationWrapper = styled.div`
    max-width: 90%;
    max-height: 400px;
    object-fit: cover;
    margin: auto;
    overflow: hidden;
`;

export const PublicationText = styled.p`
    font-size: 18px;
    font-weight: 400;
    line-height: 1.5;
    max-width: 90%;
    margin: auto;
    margin-top: 8px;
`;

export const PublicationMediaImageStyled = styled.div`
    margin: auto;
    max-width: 100%;
    height: 100%;
    object-fit: cover;
`;
