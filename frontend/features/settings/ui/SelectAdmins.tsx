import React, { useRef, useState, useEffect } from "react";

import { useGetRelationQuery } from "@entities/relation";
import { useViewer } from "@entities/viewer";
import { useSelectAdimnsMutation, useGetAdminsQuery } from "@features/settings/api/settingApi";


export const SelectAdmins: React.FC = ({ title }) => {
    const viewerContext = useViewer();
    const [selectItem, setSelectItem] = useState([]);
    const username = viewerContext.authViewer.user.username as string;
    const { data, isLoading } = useGetRelationQuery(username);
    const admins = useGetAdminsQuery(title);
    const [selectAdmins] = useSelectAdimnsMutation();
    const select = useRef(null);
    const onSelect = (event) => {
        const selected = [...select.current.options]
            .filter(option => option.selected)
            .map(option => option.value);
        console.log(selected)
        selectAdmins({ 
            title: title,
            admins: JSON.stringify(selected)
        });
    }

    let adminsUsernames: [String] = []
    useEffect(()=>{
        if (!admins.isLoading) {
            for(data of admins.data){
                adminsUsernames.push(data.username)
                console.log('root2' in adminsUsernames)
            } 
        }
    }, admins.isLoading)
    
    return (
        <div>
            { !isLoading && !admins.isLoading &&
                <select multiple onClick={onSelect} ref={select}>
                    { data.friends.map(item => 
                        <option key={item.username} value={item.username} selected={item.username in adminsUsernames}>{item.username}</option>) }
                </select>
            }
           
        </div>
    )
};
