import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

import { Wrapper, Margin, TwoColumnGrid } from '@shared/ui';
import { withAuth } from '@entities/viewer';
import { Header } from '@widgets/header';
import { PublicationFeedList } from '@widgets/publicationsList';


const FriendRequestsPage: NextPage = () => {
  return (
    <>
      <Header />
      <Margin mt={100}>
        <Wrapper>
          <PublicationFeedList />
        </Wrapper>
      </Margin>
    </>
  )
};

export default dynamic(() => Promise.resolve(withAuth(FriendRequestsPage)), {
  ssr: false
});
