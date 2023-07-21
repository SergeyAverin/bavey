import React, { useState, useEffect } from "react";

import { Margin, Button, Flex, Submit, Input } from "@shared/ui";
import { SettingsForm } from './styled';
import { useUpdateUserSettingsMutation } from "@features/settings/api/settingApi";
import { useGetUserQuery } from "@entities/user";
import { useViewer } from "@entities/viewer";
import { useRouter } from "next/router";
import { imageLoader } from "@shared/lib";


export const SettingForm: React.FC = () => {
    const viewerContext = useViewer();
    const username = viewerContext.authViewer.user.username;

    const [updateSetting] = useUpdateUserSettingsMutation();
    const [image, setImage] = useState(null);
    const router = useRouter();
    const [userSetting, setUserSetting] = useState({
        username: '',
        first_name: '',
        last_name: '',
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
                first_name: data.first_name,
                last_name: data.last_name,
                description: data.description
            })
            console.log(imageLoader({src: data.avatar}))

 
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
        formData.append('username', userSetting.username.toString());
        formData.append('first_name', userSetting.first_name.toString());
        formData.append('last_name', userSetting.last_name.toString());
        formData.append('description', userSetting.description.toString());
        const data = {};
        for (const [key, value] of formData.entries()) {
            data[key] = value;
        }
        updateSetting({slug: userSetting.username, body: formData});
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
                                Аватар <br />
                                <input
                                    accept="image/*" 
                                    type="file"
                                    onChange={handleFileChange}
                                />
                            </Margin>
                            <Input
                                attrName="username"
                                inputValues={userSetting.username}
                                labelText="username"
                                setInputValues={(event) => {change(event, 'username')}}
                            />
                            <Margin mt={15}>
                                <Input
                                    attrName="first_name"
                                    inputValues={userSetting.first_name}
                                    labelText="Имя:"
                                    setInputValues={(event) => {change(event, 'first_name')}}
                                />
                            </Margin>
                            <Margin mt={15}>
                                <Input
                                    attrName="last_name"
                                    inputValues={userSetting.last_name}
                                    labelText="Фамилия:"
                                    setInputValues={(event) => {change(event, 'last_name')}}
                                />
                            </Margin>
                            <Margin mt={15}>
                            
                            <Input
                                attrName="description"
                                inputValues={userSetting.description}
                                labelText="Описание:"
                                setInputValues={(event) => {change(event, 'description')}}
                            />
                            </Margin>
                
                        </div>
                    
                </Margin>
            </Margin>
        </SettingsForm>
    )
};

