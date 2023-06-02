import React from "react";

import { Flex, CursorPointer } from "@shared/ui";
import { SetVoiceCountStyled } from "@features/SetVoicesButton/ui/styled";
import { useSetVoiceMutation } from "../api/voicesButtonApi";


interface ISetVoiceButtonProps {
    voiceCount: number,
    publicationSlug: string,
    iconDisable: React.ReactNode,
    iconEnable: React.ReactNode,
    voiceType: string,
    isEnableProps: boolean
}

export const SetVoiceButton: React.FC<ISetVoiceButtonProps> = ({ isEnableProps, voiceCount, iconDisable, iconEnable, publicationSlug, voiceType }) => {
    const [ setVoice ] = useSetVoiceMutation();
    
    const clickHeandler = (event: React.MouseEvent) => {
        setVoice({ publicationSlug: publicationSlug, voiceType: voiceType });
    }

    return (
        <CursorPointer>
            <Flex justifyContent="center" alignItems="center" onClick={clickHeandler}>
                { isEnableProps ? iconEnable : iconDisable }
                <SetVoiceCountStyled isEnable={isEnableProps}>
                    { voiceCount }
                </SetVoiceCountStyled>
            </Flex>
        </CursorPointer>
    )
}
