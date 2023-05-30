import React, { useState } from "react";

import { Margin, Button, Flex, Submit, Input } from "@shared/ui";
import { SettingsForm } from './styled';

export const SettingForm: React.FC = () => {
    const [image, setImage] = useState(new Blob());
    const [userSetting, setUserSetting] = useState({
        username: '',
        first_name: '',
        last_name: '',
        description: '',
        country: '',
        city: '',
    });
    const change = (event:React.ChangeEvent<HTMLInputElement>, key: string) => {
        console.log(event)
        setUserSetting({...userSetting, [key]: event})
    }
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

