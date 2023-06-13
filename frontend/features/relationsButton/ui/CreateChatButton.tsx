import React from "react";
import { useRouter } from "next/router";

import { Button } from "@shared/ui";
import { useCreateChatMutation } from "@features/relationsButton/api/relationButtonsApi";


export const CreateChatButton:React.FC = ({ username }) => {
    const [createChat] = useCreateChatMutation();
    const router = useRouter();
    const onclick = () => {
        createChat(username).then(res => {
            router.push(`/messenger/${res.data.slug}`)
        })
    }
    return (
        <Button onClick={onclick}>
            Открыть чат
        </Button>
    )
}
