import React, { useRef, useState } from "react";

import { useGetRelationQuery } from "@entities/relation";
import { useViewer } from "@entities/viewer";


export const SelectAdmins: React.FC = () => {
    const viewerContext = useViewer();
    const [selectItem, setSelectItem] = useState([]);
    const username = viewerContext.authViewer.user.username as string;
    const { data, isLoading } = useGetRelationQuery(username);
    const select = useRef(null);
    const onSelect = (event) => {
        const selected = [...select.current.options]
            .filter(option => option.selected)
            .map(option => option.value);
        console.log(selected)
    }
   
    return (
        <div>
            { !isLoading &&
                <select multiple onClick={onSelect} ref={select}>
                    { data.friends.map(item => <option value={item.username}>{item.username}</option>) }
                </select>
            }
           
        </div>
    )
};
