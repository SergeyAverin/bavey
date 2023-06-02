import styled from 'styled-components';


export const PublicationStyle = styled.div`
    background: ${props => props.theme.color.grey};
    border-radius: 16px;
    padding: 25px 0px 25px 0px;
`;

export const PublicationWrapper = styled.div`
    max-width: 90%; 
    object-fit: cover;
    margin: auto;
`;

export const PublicationText = styled.p`
    font-size: 18px;
    font-weight: 400;
    line-height: 1.5;
    max-width: 90%;
    margin: auto;
    margin-top: 8px;
`;

export const PublicationMediaImagesStyled = styled.div`
    margin: auto;
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

interface IMediaIimage {
    isActive: boolean
}

export const MediaImage = styled.img<IMediaIimage>`
    display: ${(props) => props.isActive ? 'block' : 'none'};
    object-fit: cover;
`;
export const MediaImageNumbers = styled.div`
    background: ${props => props.theme.color.black};
    padding: 8px;
    width: 50px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
`;
export const MediaImageButton = styled.div`
    background: ${props => props.theme.color.black};
    padding: 4px;
    width: 25px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    user-select: none;
    cursor: pointer;
`;