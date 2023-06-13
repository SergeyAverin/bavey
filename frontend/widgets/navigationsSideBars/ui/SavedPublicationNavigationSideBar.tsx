import React, { useContext } from "react";
import { ThemeContext } from 'styled-components';

import { NavigationSideBarStyled } from "./styled";
import { LinkWithIcon, Margin } from "@shared/ui";

import DownVoiceIcon from '@public/downVoiceIcon.svg';
import UpVoiceIcon from '@public/upVoiceIcon.svg';
import BookmarkIcon from '@public/bookmarkIcon.svg';


export const SavedPublicationNavigationSideBar: React.FC = () => {
    const theme = useContext(ThemeContext);

    return (
        <NavigationSideBarStyled>
            <LinkWithIcon href="/saved/up" text='Лайки' icon={<UpVoiceIcon fill={theme.color.white} />} isActive={false} />
            <Margin mt={15}>
                <LinkWithIcon href="/saved/down" text='Дизлайки' icon={<DownVoiceIcon fill={theme.color.white} />} isActive={false} />
            </Margin>
            <Margin mt={15}>
                <LinkWithIcon href="/saved/bookmark" text='Закладки' icon={<BookmarkIcon fill={theme.color.white} />} isActive={false} />
            </Margin>
        </NavigationSideBarStyled>
    )
}
