import React from "react";

import { Button } from "@shared/ui";
import { useUnsubscriptionMutation } from "../api/communityButtonsApi";


interface IUnsubscriptionButtonProps {
    title: string
};

export const UnsubscriptionButton: React.FC<IUnsubscriptionButtonProps> = ({ title }) => {
    const [ unsubscription ] = useUnsubscriptionMutation();

    const clickHeandler = (event: React.MouseEvent) => {
        event.preventDefault();
        unsubscription(title);
    }

    return (
        <>
            <Button onClick={clickHeandler}>Unsubscribe</Button>
        </>
    )
}
