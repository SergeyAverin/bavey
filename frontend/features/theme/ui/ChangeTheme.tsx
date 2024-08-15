import React, { useState } from "react";

import { DropDownSelectItemsStyled, DropDownSelectItemStyled, DropDownSelectTitleStyled } from "./styled";
import { toggleTheme } from "@features/theme/models/changeThemeSlice";

import Arrow from "@public/arrow.svg";
import { useDispatch, useSelector } from "react-redux";




export const ChangeTheme:React.FC<IDropDownSelectProps> = () => {
    const items = ['Темная тема', 'Светлая тема']
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(true);
    const [activeItem, setActiveItem] = useState(items[0]);
    const isDarkMode = useSelector((state) => state.theme.darkMode);
    const setActiveItemHandler:React.MouseEventHandler<HTMLElement> = (event) => {
        setIsOpen((prev) => !prev);
        const target = event.target as HTMLElement;
        setActiveItem(target.innerText);
        if (target.innerText == 'Темная тема') {
            dispatch(toggleTheme({isDark: true}));
        } else if (target.innerText == 'Светлая тема') {
            dispatch(toggleTheme({isDark: false}));
        }
    };
    
    return (
        <div>
            <DropDownSelectTitleStyled onClick={() => setIsOpen((prev) => !prev)}>
                <Arrow transform={isOpen ? "rotate(-90 0 0)" : "rotate(0 0 0)"} />
                { activeItem }
            </DropDownSelectTitleStyled>
            <DropDownSelectItemsStyled isOpen={isOpen}>
                <ul onClick={setActiveItemHandler}>
                    { items.map((item) => (<DropDownSelectItemStyled key={item}>{item}</DropDownSelectItemStyled>)) }
                </ul>
            </DropDownSelectItemsStyled>
        </div>
    )
};

