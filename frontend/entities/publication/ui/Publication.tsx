import React from "react";

import { PublicationStyle, PublicationWrapper, PublicationText } from "./styled";
import { MediaImageSlider } from "@entities/publication/ui/MediaImage";
import { MediaFile } from "@entities/publication/ui/MediaFile";
import { IPublication } from '../model/types';
import { Flex } from "@shared/ui";
import { Margin } from "@shared/ui";
import { PublicationMenu } from "@entities/publication/ui/PublicationMenu";
import { useViewer } from "@entities/viewer";
import Link from "next/link";



interface IPublicationProps {
  publication: IPublication
  publicationHeader: React.ReactNode,
  publicationVoiceSlot: React.ReactNode
}

export const Publication: React.FC<IPublicationProps> = (props) => {
  const viewerContext = useViewer();
  let username = 'username';
  let ownerUsername = 'owner';
  if (process.browser) {
    username = viewerContext.authViewer.user.username;
    ownerUsername = props.publication.owner.username;
  }

  return (
    <PublicationStyle>
        <PublicationWrapper>
          <Flex justifyContent="space-between" alignItems="center">
            { props.publicationHeader }
            { username == ownerUsername && <PublicationMenu slug={props.publication.publication.slug} />}
            
          </Flex>
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
        { props.publication.publication.wall_type == 'community'
        && <a href={`/user/${props.publication.owner.username}`}>Autor: {props.publication.owner.username}</a> }
        <Margin mt={15}>
          { props.publicationVoiceSlot }
        </Margin>
        
        </PublicationWrapper>
    </PublicationStyle>
  )
};
