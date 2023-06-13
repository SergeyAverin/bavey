import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { ThemeContext } from 'styled-components';

import { Margin } from '@shared/ui';
import { Publication } from '@entities/publication';
import { useGetPublicationListQuery, UserMini } from '@entities/User';
import { IPublication } from '@entities/publication';
import { PublicationVoices } from '@features/SetVoicesButton/ui/PublicationVoices';
import { CommunityMini } from '@entities/community';


interface IPublicationList {
    publicationsFromServerRender: IPublication[],
    getPublication: Function
}

export const PublicationList: React.FC<IPublicationList> = ({ publicationsFromServerRender, getPublication }) => {
    const router = useRouter();
    const pulicationListQuery = getPublication();
    console.log(pulicationListQuery)
    // const publications = pulicationListQuery.data ?? [];
    const publications = pulicationListQuery.data ?? publicationsFromServerRender;
    const theme = useContext(ThemeContext)

    return (
        <>
            { publications.length == 0 && <div>No publications</div> }
            { publications.map((publication) => (
                <Margin mb={30}  key={publication.publication.slug}>
                    <Publication
                        publicationHeader={
                            publication.publication.wall_type == 'user'? 
                            <UserMini user={publication.owner} />
                            :
                            <CommunityMini community={publication.community}/>
                        }
                        publication={publication} 
                        publicationVoiceSlot={<PublicationVoices publication={publication} />}
                    />
                </Margin>
            ))}
        </>
    )
}
