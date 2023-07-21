import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { ThemeContext } from 'styled-components';

import { Margin } from '@shared/ui';
import { Publication } from '@entities/publication';
import { useGetPublicationListQuery, UserMini } from '@entities/user';
import { IPublication } from '@entities/publication';
import { SetVoiceButton } from '@features/SetVoicesButton';
import { useGetSavedPublicationListQuery } from '../api/savedPublicationListApi';

import DownVoiceIcon from '@public/downVoiceIcon.svg';
import BookmarkIcon from '@public/bookmarkIcon.svg';
import UpVoiceIcon from '@public/upVoiceIcon.svg';
import { PublicationVoices } from '@features/SetVoicesButton/ui/PublicationVoices';

interface ISavedPublicationListProps {
    savedType: string
}

export const SavedPublicationList: React.FC<ISavedPublicationListProps> = ({savedType}) => {
    const pulicationListQuery = useGetSavedPublicationListQuery();
    let publications =  pulicationListQuery.data ?? [];
    if (pulicationListQuery.data) {
        switch (savedType) {
            case 'up':
                publications = publications?.saved_voices_up;
                break;
            case 'down':
                publications = publications?.saved_voices_down;
                break;
            case 'bookmark':
                publications = publications?.saved_bookmarks;
                break;
        }
    }

    const theme = useContext(ThemeContext)

    return (
        <div>  
            { publications.map((publication) => (
                <Margin mb={30}  key={publication.publication.slug}>
                    <Publication
                        publicationHeader={<UserMini user={publication.owner} />}
                        publication={publication} 
                        publicationVoiceSlot={<PublicationVoices publication={publication} />}
                        
                    />
                </Margin>
            ))}
            {publications.length == 0 && <h2>Нет публикаций</h2>}
        </div>
    )
}
