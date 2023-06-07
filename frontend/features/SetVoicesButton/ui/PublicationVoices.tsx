import React, { useContext } from "react";
import { ThemeContext } from 'styled-components';

import { Flex, Margin } from "@shared/ui";
import { IPublication } from "@entities/publication";
import { IUser } from "@entities/User"; 
import { SetVoiceButton } from "@features/SetVoicesButton/ui/SetVoiceButton";
import { useViewer } from "@entities/viewer";

import DownVoiceIcon from '@public/downVoiceIcon.svg';
import BookmarkIcon from '@public/bookmarkIcon.svg'; 
import UpVoiceIcon from '@public/upVoiceIcon.svg';


interface IPuvlicationVoicesProps { 
    publication: IPublication
}



export const PublicationVoices: React.FC<IPuvlicationVoicesProps> = ({ publication }) => {
    const theme = useContext(ThemeContext);
    const viewerContext = useViewer();
    let username = 'username';
    if (process.browser) {
      username = viewerContext.authViewer.user.username;
    }
    const isUserSetVoice = (voices: [IUser], username:string) => {
        for (let voice of voices) {
            if (voice.username == username) {
                return true
            }
        }
        return false;
    }
    return (
        <Flex justifyContent="space-between"  alignItems="center">
            <Flex justifyContent="flex-start" alignItems="center">
                <SetVoiceButton
                    publicationSlug={publication.publication.slug}
                    voiceType='voices_up'
                    isEnableProps={isUserSetVoice(publication.voices_up, username)}
                    iconDisable={<UpVoiceIcon fill={theme.color.white} />}
                    iconEnable={<UpVoiceIcon fill={theme.color.grean} />}
                    voiceCount={publication.voices_up.length}
                />
                <Margin ml={15}>
                    <SetVoiceButton
                        publicationSlug={publication.publication.slug}
                        isEnableProps={isUserSetVoice(publication.voices_down, username)}
                        voiceType='voices_down'
                        iconDisable={<DownVoiceIcon fill={theme.color.white} />}
                        iconEnable={<DownVoiceIcon fill={theme.color.grean} />}
                        voiceCount={publication.voices_down.length}
                    />
                </Margin>
            </Flex>
            <SetVoiceButton
                publicationSlug={publication.publication.slug}
                isEnableProps={isUserSetVoice(publication.bookmarks, username)}
                voiceType='bookmarks'
                iconDisable={<BookmarkIcon fill={theme.color.white} />}
                iconEnable={<BookmarkIcon fill={theme.color.grean} />}

            />
        </Flex>
    )
};
