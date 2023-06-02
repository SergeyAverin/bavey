import React from "react";
import Link from "next/link";

import { HeaderStyled } from "./styled";
import { Logo, Wrapper, Margin, Flex } from "@shared/ui";
import { existsVieweInStorage } from '@shared/lib';
import { NavigationSelect } from "@features/NavigationSelect";
import { ProfileMenu } from "@features/profileMenu/ui/ProfileMenu";
import { Search } from "@features/search";


export const Header: React.FC = () => {
    const isAuthenticated = existsVieweInStorage();
    return (
        <HeaderStyled>
            <Wrapper>
                <Flex alignItems="center" justifyContent="space-between">
                    <div>
                        <a href={!isAuthenticated ? '/' : '/login'}>
                            <Logo />
                        </a>
                        <Margin ml={185}>
                           
                        { (isAuthenticated && process.browser) && <NavigationSelect />}

                        </Margin>
                    </div>
                    <Flex alignItems="center" justifyContent="flex-start">
                        <Margin mr={25}>
                            <Search />
                        </Margin>
                        { (isAuthenticated && process.browser) && <ProfileMenu />}
                        { (!isAuthenticated && process.browser) && <Link href='/login'>login</Link>}
                    </Flex>
                    
                </Flex>
            </Wrapper>
        </HeaderStyled>
    )
}
