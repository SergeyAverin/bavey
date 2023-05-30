import React from "react";
import Image from "next/image";
import { imageLoader } from "@shared/lib";
import { PublicationMediaImageStyled } from './styled'

interface IMedia {
    type: string
    image: string,
    file: string
}

interface IMediaImageSliderProps {
    images: [IMedia]
}

export const MediaImageSlider: React.FC<IMediaImageSliderProps> = ({ images }) => {
    images = images.filter((media) => media.type == 'image')
    return (
        <PublicationMediaImageStyled>
            { images.map((image) => <img src={imageLoader({src:image.image})} />) }
        </PublicationMediaImageStyled>
    )
}
