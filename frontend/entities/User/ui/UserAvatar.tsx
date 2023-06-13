import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import { imageLoader } from "@shared/lib";
import { IUser } from "../model/types";
import { Button, Flex, Margin } from "@shared/ui";
import { UserAvetarStyled } from "@entities/User/ui/styled";
import { useGetRelationForUserQuery } from "@entities/relation";
import Link from "next/link";
import { CreateChatButton } from "@features/relationsButton/ui/CreateChatButton";


interface IUserAvetarProps {
    user: IUser,
    unsubscribeSlot: React.ReactNode,
    unfriendSlot: React.ReactNode,
    subscribeSlot: React.ReactNode,
    addFriendSlot: React.ReactNode,
}

export const UserAvetar: React.FC<IUserAvetarProps> = ({ user, unfriendSlot, unsubscribeSlot, subscribeSlot, addFriendSlot }) => {
    const { data, isLoading } = useGetRelationForUserQuery(user.username);
    const router = useRouter();

    return (
        <UserAvetarStyled>
            <Image 	style={{objectFit: "contain"}} loader={imageLoader}  src={user.avatar} width={150} height={150} alt={user.username} />
            <Margin mt={15}>
                <Flex alignItems="center" justifyContent="center" flexDirection="column">
                    { !isLoading && data.relationship_type == 'subscribed' &&
                        unsubscribeSlot
                    }
                    { !isLoading && data.relationship_type == 'friend' &&
                        <div>
                            <CreateChatButton username={user.username} />
                            {unfriendSlot}
                        </div>
                    }
                        
                    { !isLoading && data.relationship_type == 'stranger' &&
                        subscribeSlot
                    }

                    { !isLoading && data.relationship_type == 'subscriber' &&
                        <div></div>
                    }
                
                </Flex>
            </Margin>
        </UserAvetarStyled>
    )
};
/*
                            <Button>Send Message</Button>
    { !isLoading && data.relationship_type == 'profile' &&
                        <Button onClick={() => {router.push('/settings')}}>Edit</Button>
                    }
*/