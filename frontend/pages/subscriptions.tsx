import type { NextPage } from 'next'

import { Wrapper, TwoColumnGrid, Margin } from '@shared/ui';
import { Header } from '@widgets/header';
import { Subscription } from '@entities/community';
import { withAuth } from '@entities/viewer';
import { UnsubscriptionButton } from '@features/communityButton';
import { useGetCommunityListQuery } from '@entities/community/api/communityApi';
import { CreateCommunity } from '@features/createCommunity';


const SubsctiptionPage: NextPage = () => {
  const { data, isLoading } = useGetCommunityListQuery();
  let communites = [];
  if (data) {
    communites = data;
  }
  return (
    <>
      <Header />
      <Margin mt={100}> 
        <Wrapper>
          <CreateCommunity />
          {communites.map((community) => (
              <Margin mb={30} key={community.title}>
                  <Subscription
                    community={community}
                    communitySubscribeButton={<UnsubscriptionButton title={community.title} />} />
              </Margin>
            ))}
        </Wrapper>
      </Margin>
    </>
  )
};

export default withAuth(SubsctiptionPage);
