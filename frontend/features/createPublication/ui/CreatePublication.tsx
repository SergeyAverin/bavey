import React, { useState } from "react";
import Image from "next/image";

import { PublicationCreatorStyled, PublicationInput, AddImage, PublicationButton } from "./styled";
import { Flex, Margin } from "@shared/ui";
import { IPublication } from "@entities/publication";
import { useCreatePublicationMutation } from "../api/createPublicationApi";

import ImageSVG from "@public/image.svg";


interface ICreatePublicationProps {
    wallSlug: string,
    wallType: string,
}

export const CreatePublication:React.FC<ICreatePublicationProps> = ({wallSlug, wallType}) => {
    const [inputValue, setInputValues] = useState('');
    const [image, setImage] = useState();
    const [createPublication] = useCreatePublicationMutation();

    const submitHandler = async (event: React.SyntheticEvent) => {
        event.preventDefault();

        if (inputValue != '') {
            const formData = new FormData();
            for (let i = 0; i < image.length; i++) {
              formData.append('image' + i, image[i]);
            }
            formData.append('title', inputValue);
            console.log(formData)
            createPublication({wallSlug: wallSlug, wallType: wallType, body: formData});

            setInputValues('');
            setImage();
        }
    };

    const handleFileChange = (event) => {
        const selectedFiles = Array.from(event.target.files);
        setImage(selectedFiles);
    };

    return (
        <PublicationCreatorStyled onSubmit={submitHandler}>
            <PublicationInput
                placeholder="What’s Happening?"
                value={inputValue}
                onChange={(event:React.ChangeEvent<HTMLInputElement>) => setInputValues(event.target.value)}
            />
            <Margin mt={15}>
                <Flex alignItems="center" justifyContent="space-between" >
                    <AddImage multiple={true} accept="image/*"  onChange={handleFileChange} />
                    <PublicationButton value="Public" />
                </Flex>
            </Margin>
        </PublicationCreatorStyled>
    )
};
