import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { ThemeContext } from 'styled-components';

import { Margin } from '@shared/ui';
import { Publication } from '@entities/publication';
import { UserMini } from '@entities/User';
import { IPublication } from '@entities/publication';
import { SetVoiceButton } from '@features/SetVoicesButton';
import { useGetPublicationFeedQuery } from '../api/feedApi';
import { Center } from './styled';

import DownVoiceIcon from '@public/downVoiceIcon.svg';
import BookmarkIcon from '@public/bookmarkIcon.svg';
import UpVoiceIcon from '@public/upVoiceIcon.svg';
import { PublicationVoices } from '@features/SetVoicesButton/ui/PublicationVoices';
import { CommunityMini } from '@entities/community';
import { useGetPublicationFeedTiemQuery } from '../api/feedApi';


export const FeedTime: React.FC = () => {
    const [page, setPage] = useState(1);
    const pulicationListQuery = useGetPublicationFeedTiemQuery(page);
    const publications = pulicationListQuery.data ?? [];
    const theme = useContext(ThemeContext)

    useEffect(() => {
        const onScroll = () => {
        const scrolledToBottom =
            window.innerHeight + window.scrollY >= document.body.offsetHeight;
        if (scrolledToBottom && !pulicationListQuery.isFetching) {
            setPage(page + 1);
        }
        };

        document.addEventListener("scroll", onScroll);

        return function () {
        document.removeEventListener("scroll", onScroll);
        };
    }, [page, pulicationListQuery.isFetching]);
    
    return (
        <Center>
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
        </Center>
    )
}
