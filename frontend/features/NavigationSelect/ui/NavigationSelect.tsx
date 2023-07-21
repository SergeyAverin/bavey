import React, { useState, useContext } from 'react';
import { ThemeContext } from 'styled-components';

import { NavigationBlockStyled, NavigationBlockTitleStyled } from './styled';
import { Flex, Margin, LinkWithIcon } from '@shared/ui';

import Arrow from "@public/arrow.svg";
import FriendsIcon from '@public/friends.svg';
import BookmarkIcon from '@public/bookmarkIcon.svg';
import CommunityIcon from '@public/communityIcon.svg';
import ChatIcon from '@public/Chat_fill.svg';


export const NavigationSelect: React.FC = () => {
    const theme = useContext(ThemeContext);
    const [isOpen, setIsOpen] = useState(false);
    //const navigationContext = useNavigation();

    return (
        <NavigationBlockStyled
            isOpen={isOpen}
            onClick={() => setIsOpen((prev)=>(!prev))}
        >

        <Flex alignItems='center' justifyContent='space-between' >
            <NavigationBlockTitleStyled>Навигация</NavigationBlockTitleStyled>
            <Arrow  transform={isOpen ? "rotate(0 0 0)" : "rotate(-90 0 0)"}  />
        </Flex>
        
        { isOpen &&
            <>
                <Margin mt={20} mb={15}>
                    <LinkWithIcon isActive={false} text='Друзья' href='/friends' icon={<FriendsIcon stroke={theme.color.white}  />} />
                </Margin>
             
                <Margin mb={15}>
                    <div>
                        <LinkWithIcon isActive={false} text='Сохранено' href='/saved/up' icon={<BookmarkIcon fill={theme.color.white}  />} />
                    </div>
                </Margin>

                <Margin mb={15}>
                    <div>
                        <LinkWithIcon isActive={false} text='Сообщества' href='/subscriptions' icon={<CommunityIcon fill={theme.color.white}  />} />
                    </div>
                </Margin>
                <Margin mb={15}>
                    <div>
                        <LinkWithIcon isActive={false} text='Чаты' href='/messenger/' icon={<ChatIcon />} />
                    </div>
                </Margin>
            </>
        }   
        </NavigationBlockStyled>
    )
};

