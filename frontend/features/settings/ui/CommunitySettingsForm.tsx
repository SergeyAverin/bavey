import React, { useState, useEffect } from "react";

import { Margin, Button, Flex, Submit, Input } from "@shared/ui";
import { SettingsForm } from './styled';
import { useUpdateSettingsMutation } from "@features/settings/api/settingApi";
import { useGetUserQuery } from "@entities/User";
import { useViewer } from "@entities/viewer";
import { useRouter } from "next/router";
import { imageLoader } from "@shared/lib";


export const UserSettingsForm: React.FC = () => {
    const viewerContext = useViewer();
    const username = viewerContext.authViewer.user.username;

    const [updateSetting] = useUpdateSettingsMutation();
    const [image, setImage] = useState(null);
    const router = useRouter();
    const [userSetting, setUserSetting] = useState({
        title: '',
        description: '',
    });
    const {data, isLoading} = useGetUserQuery(username);
    
    async function fetchImage(url){
        const data = await fetch(url);
        console.log(data);
        const buffer = await data.arrayBuffer();
        const blob = new Blob([buffer], { type: "image/png"});
        return blob;
    }
    useEffect(()=>{
        if (!isLoading) {
            setUserSetting({
                username: data.username,
                description: data.description
            })
 
            fetchImage(imageLoader({src: data.avatar}))
                .then(blob  => new File([blob],'file.png'))
                .then(file  => {
                    const dT = new ClipboardEvent('').clipboardData || new DataTransfer();
                    dT.items.add(file)
                    console.log('file')
                    console.log(file)
                    setImage(file)
                    // reader.readAsDataURL(dT.files[0]);
                });
        }
    }, [isLoading])

    const change = (event:React.ChangeEvent<HTMLInputElement>, key: string) => {
        setUserSetting({...userSetting, [key]: event})
    }
    const submitHandler = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        const formData = new FormData();
        if (image) {
            formData.append('avatar', image);
        }
        formData.append('title', userSetting.username.toString());
        formData.append('description', userSetting.description.toString());
        const data = {};
        for (const [key, value] of formData.entries()) {
            data[key] = value;
        }
        updateSetting({slug: username, body: formData});
        router.push(`/user/${userSetting.username}`)
    };
    const handleFileChange = (event) => {
        setImage(event.target.files[0]);
    };
    return (
        <SettingsForm onSubmit={submitHandler} method="POST">
            <Margin mt={10}>
                <Flex alignItems='center' justifyContent='space-between'>
                    <Button onClick={(event)=> {change}}>Cancel</Button>
                    <Submit value="Applay" /> 
                </Flex>
                <Margin mt={15}>
                        <div>
                            <Margin mb={15}>
                                <input
                                    accept="image/*" 
                                    type="file"
                                    onChange={handleFileChange}
                                />
                            </Margin>
                            <Input
                                attrName="title"
                                inputValues={userSetting.title}
                                labelText="title"
                                setInputValues={(event) => {change(event, 'title')}}
                            />
                            <Margin mt={15}>
                            
                            <Input
                                attrName="description"
                                inputValues={userSetting.description}
                                labelText="description"
                                setInputValues={(event) => {change(event, 'description')}}
                            />
                            </Margin>
                
                        </div>
                    
                </Margin>
            </Margin>
        </SettingsForm>
    )
};

