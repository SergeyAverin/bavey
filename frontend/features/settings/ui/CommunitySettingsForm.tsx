import React, { useState, useEffect } from "react";

import { Margin, Button, Flex, Submit, Input } from "@shared/ui";
import { SettingsForm } from './styled';
import { useUpdateCommunitySettingsMutation } from "@features/settings/api/settingApi";
import { useGetCommunityQuery } from "@entities/community";
import { useGetRelationQuery } from "@entities/relation";
import { useViewer } from "@entities/viewer";
import { useRouter } from "next/router";
import { imageLoader } from "@shared/lib";
import { SelectAdmins } from "./SelectAdmins";


export const CommunitySettingsForm: React.FC = ({ title }) => {
    const viewerContext = useViewer();
    const username = viewerContext.authViewer.user.username as string;
    const [updateSetting] = useUpdateCommunitySettingsMutation();
    const [image, setImage] = useState(null);
    const router = useRouter();
    const [userSetting, setUserSetting] = useState({
        title: '',
        description: '',
    });
    const {data, isLoading} = useGetCommunityQuery(title);
    const relations =  useGetRelationQuery(username);

    
    async function fetchImage(url){
        const data = await fetch(url);
        console.log(data);
        const buffer = await data.arrayBuffer();
        const blob = new Blob([buffer], { type: "image/png"});
        return blob;
    }
    
    useEffect(()=>{
        //console.log(relations.data.friends)
    }, [relations.isLoading])

    useEffect(()=>{
        if (!isLoading) {
            setUserSetting({
                title: data.title,
                description: data.description   
            })
 
            fetchImage(imageLoader({src: data.community_avatar}))
                .then(blob  => new File([blob],'file.png'))
                .then(file  => {
                    const dT = new ClipboardEvent('').clipboardData || new DataTransfer();
                    dT.items.add(file)
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
            formData.append('community_avatar', image);
        }
        formData.append('title', userSetting.title.toString());
        formData.append('description', userSetting.description.toString());
        const data = {};
        for (const [key, value] of formData.entries()) {
            data[key] = value;
        }
        updateSetting({slug: title, body: formData});
        router.push(`/community/${userSetting.title}`)
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
                <SelectAdmins title={title} />
            </Margin>
        </SettingsForm>
    )
};

