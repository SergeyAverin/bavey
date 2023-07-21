import React, { useState } from "react";
import styled, { css } from "styled-components";

import MenuIcon from '@public/menu.svg';
import { useDeletePublicationMutation } from "@entities/publication/api/publicationApi";

interface IMenu {
    isOpen: boolean
}

export const Menu  = styled.div<IMenu>`
    display: none;
    ${(props) => props.isOpen && css`
        display: block;
        position: absolute;
        z-index: 15;
        top: 0px;
        right: 20px;
        width: 230px;
        min-height: 100px;
        background: ${props => props.theme.color.black};
        border-radius: 15px;
        border: 2px solid ${props => props.theme.color.grey};
        box-shadow: 0px 0px 7px -5px rgba(0, 0, 0, 0.6);
        padding: 15px;
    `}
`;
export const MenuWrapper  = styled.div`
    display: flex;
    align-items: center;
    user-select: none;
    position: relative;
`;
export const MenuItem  = styled.div`
    font-size: 18px;
    margin-bottom: 14px;
    cursor: pointer;
`;

interface IPublicationMenu {
    slug: string
}

export const PublicationMenu: React.FC<IPublicationMenu> = ({ slug }) => {
    const [isActive, setIsActive] = useState(false);
    const [deletePublication] = useDeletePublicationMutation();
    const onClick = () => {
        setIsActive(prev => !prev)
    }
    const deletePublicationHeandler = () => {
        deletePublication({slug});
    }
    return (
        <MenuWrapper>
            <MenuIcon onClick={onClick} />
            <Menu isOpen={isActive}>
                <MenuItem onClick={deletePublicationHeandler}>Удалить</MenuItem>
            </Menu>
        </MenuWrapper>
    )
}
