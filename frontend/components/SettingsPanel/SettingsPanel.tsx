import React, { useState, useEffect } from "react";

import { SettingsPanelStyled, SettingsNavigationStyled, SettingsNavigationLinksStyled, SettingsNavigationLink, SettingsInput, SettingsLabel, SettingsTextarea } from './styled';
import SettingsPage from "../SettingPage/SettingPage";
import { useProfileQuery } from "../../redux/api/userApi";


const SettingsPanel: React.FC = () => {
    const [activePage, setActivePage] = useState('base');

    const [userSetting, setUserSetting] = useState({
        username: '',
        first_name: '',
        last_name: '',
        description: '',
        country: '',
        city: '',
    });

    const {data, isLoading} = useProfileQuery();

    useEffect(()=>{
        if (!isLoading) {
            setUserSetting({
                username: data.username,
                first_name: data.first_name,
                last_name: data.last_name,
                description: data.description,
                country: '',
                city: '',
            })
        }
    }, [isLoading])

    return (
        <SettingsPanelStyled>
            <SettingsNavigationStyled>
                <SettingsNavigationLinksStyled>
                    <SettingsNavigationLink
                        isActive={activePage=='base'}
                        onClick={() => setActivePage('base')}>Base</SettingsNavigationLink>
                    <SettingsNavigationLink
                        isActive={activePage=='photo'}
                        onClick={() => setActivePage('photo')}>Photo</SettingsNavigationLink>
                </SettingsNavigationLinksStyled>
            </SettingsNavigationStyled>
            { activePage == 'base' && !isLoading &&
                <SettingsPage>
                    <SettingsLabel>Username</SettingsLabel>
                    <SettingsInput
                        onChange={(event:React.ChangeEvent<HTMLInputElement>) => setUserSetting({...userSetting, username:event.target.value})}
                        value={userSetting.username} />
                    <SettingsLabel>First name</SettingsLabel>
                    <SettingsInput
                        onChange={(event:React.ChangeEvent<HTMLInputElement>) => setUserSetting({...userSetting, first_name:event.target.value})}
                        value={userSetting.first_name} />
                    <SettingsLabel>Last name</SettingsLabel>
                    <SettingsInput
                        onChange={(event:React.ChangeEvent<HTMLInputElement>) => setUserSetting({...userSetting, last_name:event.target.value})}
                        value={userSetting.last_name} />
                    <SettingsLabel>Discription</SettingsLabel>
                    <SettingsTextarea
                        onChange={(event:React.ChangeEvent<HTMLInputElement>) => setUserSetting({...userSetting, description:event.target.value})}
                        value={userSetting.description}></SettingsTextarea>
                    <SettingsLabel>Cauntry</SettingsLabel>
                    <SettingsInput
                        onChange={(event:React.ChangeEvent<HTMLInputElement>) => setUserSetting({...userSetting, country:event.target.value})}
                        value={userSetting.country} />
                    <SettingsLabel>City</SettingsLabel>
                    <SettingsInput
                        onChange={(event:React.ChangeEvent<HTMLInputElement>) => setUserSetting({...userSetting, city:event.target.value})}
                        value={userSetting.city} />
                </SettingsPage>
            }
            { activePage == 'photo' &&
                <SettingsPage>
                    Photo
                </SettingsPage>
            }
        </SettingsPanelStyled>
    )
}

export default SettingsPanel;
