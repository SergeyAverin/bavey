import type { NextPage } from 'next'

import { Wrapper, TwoColumnGrid, Margin } from '@shared/ui';
import { Header } from '@widgets/header';
import { Subscription } from '@entities/community';
import { withAuth } from '@entities/viewer';
import { useGetCommunityListQuery } from '@entities/community/api/communityApi';


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
          {communites.map((community) => (
              <Margin mb={30} key={community.title}>
                  <Subscription community={community} />
              </Margin>
            ))}
        </Wrapper>
      </Margin>
    </>
  )
};

export default withAuth(SubsctiptionPage);
