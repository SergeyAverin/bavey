import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react';

import { Header } from '@widgets/header';
import { Wrapper } from '@shared/ui';
import { CommunitySettingsForm } from '@features/settings/ui/CommunitySettingsForm';
import { withAuth } from '@entities/viewer';
import dynamic from 'next/dynamic'
import { Margin } from '@shared/ui';


const SettingPage: NextPage = () => {
    const router = useRouter()
    const title = router.query.slug
    return (
        <>
            <Header />
            <Margin mt={100}>
                <Wrapper>
                    <CommunitySettingsForm title={title} />
                </Wrapper>
            </Margin>
        </>
    )
};

export default dynamic(() => Promise.resolve(withAuth(SettingPage)), {
    ssr: false
});
