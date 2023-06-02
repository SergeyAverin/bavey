import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

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
    const [createPublication, { error }] = useCreatePublicationMutation();
    const router = useRouter();

    if (error) {
        if (error.status == 401) {
            router.push('/login')

        }
    }

    const submitHandler = async (event: React.SyntheticEvent) => {
        event.preventDefault();

        if (inputValue != '' || image) {
            const formData = new FormData();
            if (image) {
                for (let i = 0; i < image.length; i++) {
                    formData.append('image' + i, image[i]);
                }
            }
            formData.append('title', inputValue);
            console.log(formData)
            createPublication({wallSlug: wallSlug, wallType: wallType, body: formData});

            setInputValues('');
            setImage();
        }
    };

    const changeImput = (event:React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        if (inputValue.length <= 300) {
            setInputValues(inputValue);
        } else {
            setInputValues(inputValue.slice(0, 300));
        }
    }

    const handleFileChange = (event) => {
        const selectedFiles = Array.from(event.target.files);
        setImage(selectedFiles);
    };

    return (
        <PublicationCreatorStyled onSubmit={submitHandler}>
            <PublicationInput
                placeholder="What’s Happening?"
                value={inputValue}
                onChange={changeImput}
                maxLength={300}
            />
            <Margin mt={15}>
                <Flex alignItems="center" justifyContent="space-between" >
                    <AddImage multiple={true} accept="image/*"  onChange={handleFileChange} />
                    <Flex alignItems="center" justifyContent="flex-start">
                        <Margin mr={15}>
                            {`${inputValue.length}/${300}`}
                        </Margin>
                        <PublicationButton value="Public" />
                    </Flex>
                </Flex>
            </Margin>
        </PublicationCreatorStyled>
    )
};
