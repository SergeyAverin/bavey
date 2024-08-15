import React, { useState } from "react";

import { CreateCommunityStyled } from "@features/createCommunity/ui/styled";
import { useCreateCommunityMutation } from "@features/createCommunity/api/createCommunityApi";
import { Flex, Input, Button } from "@shared/ui";


export const CreateCommunity: React.FC = () => {
    const [title, setTitle] = useState('');
    const [createCommunity] = useCreateCommunityMutation();

    const onClickHeandler = () => {
        createCommunity(title)
    }

    return (
        <CreateCommunityStyled>
            <Input attrName="title" inputValues={title} setInputValues={setTitle}  labelText="Название"/>
            <Button onClick={onClickHeandler}>Создать сообщество</Button>
        </CreateCommunityStyled>
    )
}
