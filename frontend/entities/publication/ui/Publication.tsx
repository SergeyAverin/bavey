import React from "react";

import { PublicationStyle, PublicationWrapper, PublicationText } from "./styled";
import { MediaImageSlider } from "@entities/publication/ui/MediaImage";
import { MediaFile } from "@entities/publication/ui/MediaFile";
import { IPublication } from '../model/types';
import { Flex } from "@shared/ui";
import { Margin } from "@shared/ui";



interface IPublicationProps {
  publication: IPublication
  publicationHeader: React.ReactNode,
  publicationVoiceSlot: React.ReactNode
}

export const Publication: React.FC<IPublicationProps> = (props) => {
  return (
    <PublicationStyle>
        <PublicationWrapper>
            { props.publicationHeader }
        </PublicationWrapper>

        <Margin mt={15} mb={15}>
          <PublicationText>
            { props.publication.publication.title }
          </PublicationText>
        </Margin>
        
        <PublicationWrapper>
          <MediaImageSlider images={props.publication.publication_media} />
        </PublicationWrapper>

        <MediaFile files={props.publication.publication_media} />
        <PublicationWrapper>
        <Margin mt={15}>
          { props.publicationVoiceSlot }
        </Margin>
        
        </PublicationWrapper>
    </PublicationStyle>
  )
};
