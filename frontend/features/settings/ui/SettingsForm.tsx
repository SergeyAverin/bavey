import React, { useState, useEffect } from "react";

import { Margin, Button, Flex, Submit, Input } from "@shared/ui";
import { SettingsForm } from './styled';
import { useUpdateSettingsMutation } from "@features/settings/api/settingApi";
import { useGetUserQuery } from "@entities/User";
import { useViewer } from "@entities/viewer";


export const SettingForm: React.FC = () => {
    const viewerContext = useViewer();
    const username = viewerContext.authViewer.user.username;

    const [updateSetting] = useUpdateSettingsMutation();
    const [image, setImage] = useState(new Blob());
    const [userSetting, setUserSetting] = useState({
        username: '',
        first_name: '',
        last_name: '',
        description: '',
        country: '',
        city: '',
    });
    const {data, isLoading} = useGetUserQuery(username);
    useEffect(()=>{
        if (!isLoading) {
            setUserSetting({
                username: data.username,
                first_name: data.first_name,
                last_name: data.last_name,
                description: data.description,
                country: data.country,
                city: data.city,
            })
        }
    }, [isLoading])

    const change = (event:React.ChangeEvent<HTMLInputElement>, key: string) => {
        console.log(event)
        setUserSetting({...userSetting, [key]: event})
    }
    const submitHandler = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('avatar', image);
        formData.append('username', userSetting.username);
        formData.append('first_name', userSetting.first_name);
        formData.append('last_name', userSetting.last_name);
        formData.append('description', userSetting.description);
        formData.append('country', userSetting.country);
        formData.append('city', userSetting.city);
        updateSetting({slug: userSetting.username, body: formData});
    };
    return (
        <SettingsForm onSubmit={()=> {}}>
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
                                    onChange={(event) => setImage(event.target.files[0])}
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
                                    labelText="first_name"
                                    setInputValues={(event) => {change(event, 'first_name')}}
                                />
                            </Margin>
                            <Margin mt={15}>
                                <Input
                                    attrName="last_name"
                                    inputValues={userSetting.last_name}
                                    labelText="last_name"
                                    setInputValues={(event) => {change(event, 'last_name')}}
                                />
                            </Margin>
                            <Margin mt={15}>
                            
                            <Input
                                attrName="description"
                                inputValues={userSetting.description}
                                labelText="description"
                                setInputValues={(event) => {change(event, 'description')}}
                            />
                            </Margin>
                            <Margin mt={15}>
                            <Input
                                attrName="country"
                                inputValues={userSetting.country}
                                labelText="country"
                                setInputValues={(event) => {change(event, 'country')}}
                            />
                            </Margin>
                            <Margin mt={15}>
                            <Input
                                attrName="city"
                                inputValues={userSetting.city}
                                labelText="city"
                                setInputValues={(event) => {change(event, 'city')}}
                            />
                            </Margin>

                            

                        </div>
                    
                </Margin>
            </Margin>
        </SettingsForm>
    )
};

