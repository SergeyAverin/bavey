import React from "react";

import { Button } from "@shared/ui";
import { useSubscriptionMutation } from "../api/communityButtonsApi";


interface ISubscriptionButtonProps {
    title: string
};

export const SubscriptionButton: React.FC<ISubscriptionButtonProps> = ({ title }) => {
    const [ subscription ] = useSubscriptionMutation();

    const clickHeandler = (event: React.MouseEvent) => {
        event.preventDefault();
        subscription(title);
    }

    return (
        <>
            <Button onClick={clickHeandler}>Subscribe</Button>
        </>
    )
}
