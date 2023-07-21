import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react';

import { Wrapper, Margin } from '@shared/ui';
import { withAuth } from '@entities/viewer';
import { Header } from '@widgets/header';
import { PublicationFeedList } from '@widgets/publicationsList';
import { FeedTime } from '@widgets/publicationsList/ui/FeedTime';
import { FeedFillter } from '@widgets/navigationsSideBars/ui/FeedFillter';


const FriendRequestsPage: NextPage = () => {
  const [fillter, setFillter] = useState('time')
  return (
    <>
      <Header />
      <Margin mt={100}>
        <Wrapper>
          <FeedFillter setFillter={setFillter} fillter={fillter} />
          {fillter == 'feed' && 
            <div>
            <PublicationFeedList />
            </div>

          }
          {fillter == 'time' && 
            <FeedTime />
          }
        </Wrapper>
      </Margin>
    </>
  )
};

export default dynamic(() => Promise.resolve(withAuth(FriendRequestsPage)), {
  ssr: false
});
