import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react';

import WrapperStyled from '../styles/components/Wrapper';
import SettingsPanel from '../components/SettingsPanel/SettingsPanel';
import BaseLayout from '../components/BaseLayout/BaseLayout';
import { useNavigation } from '../providers/NavigationProviders';
import Margin from '../styles/components/Margin';
import FlexStyled from '../styles/components/Flex';
import ButtonStyled from '../styles/components/Button';
import { useProfileQuery, useUpdateUserMutation } from '../redux/api/userApi';
import { SubmitStyled } from '../styles/components/Submit';
import { Header } from '@widgets/header';
import { Wrapper } from '@shared/ui';
import { Subscription } from '@entities/community';
import { SettingForm } from '@features/settings/ui/SettingsForm';
import { withAuth } from '@entities/viewer';
import dynamic from 'next/dynamic'


const SettingPage: NextPage = () => {
    return (
        <>
            <Header />
            <Margin mt={100}>
                <Wrapper>
                    <SettingForm />
                </Wrapper>
            </Margin>
        </>
    )
};

export default dynamic(() => Promise.resolve(withAuth(SettingPage)), {
    ssr: false
});
