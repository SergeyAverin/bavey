import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

import { Wrapper, TwoColumnGrid, Margin } from '@shared/ui';
import { withAuth } from '@entities/viewer';
import { FriendRequestInside, FriendRequestOutside, useFriendRequestsQuery } from '@entities/friendRequest';
import { AcceptRequest, RejectRequest, UnsubscribeFromUser } from '@features/relationsButton';
import { Header } from '@widgets/header';
import { RelationsNavigationSideBar } from '@widgets/navigationsSideBars';


const FriendRequestsPage: NextPage = () => {
  const router = useRouter();
  const fillter = router.asPath.split('#')[1];
  const { data, isLoading } = useFriendRequestsQuery();
  let inside = [];
  let outside = [];

  if (data) {
    outside = data.outside;
    inside = data.inside;
  }
  return (
    <>
      <Header />
      <Margin mt={100}>
        <Wrapper>
          <TwoColumnGrid firstColumnSize='70%' secondColumnSize='30%'>
            <div>
            {fillter == 'outside' && 
              <div>
                <h1 name='outside'>Исходящие запросы</h1>
                {outside.map((friendRequest) => (
                  <Margin mb={30} key={friendRequest.recipient.username}>
                      <FriendRequestOutside
                        unsubscribeButtonSlot={<UnsubscribeFromUser username={friendRequest.recipient.username} />}
                        friendRequest={friendRequest}
                      />
                  </Margin>
                ))}
                { outside.length == 0 && <p>Нет запросов</p> }
              </div>
            }
            {fillter == 'inside' && 
              <div>
                <h1 name='inside'>Входящие запросы</h1>
                {inside.map((friendRequest) => (
                  <Margin mb={30} key={friendRequest.recipient.username}>
                      <FriendRequestInside
                        friendRequest={friendRequest}
                        acceptButtonSlot={<AcceptRequest frindRequestPK={friendRequest.pk} />}
                        rejectButtonSlot={<RejectRequest frindRequestPK={friendRequest.pk} />}
                      />
                  </Margin>
                  ))}
                  { inside.length == 0 && <p>Нет запросов</p> }
              </div>
            }
            </div>
            <RelationsNavigationSideBar />
          </TwoColumnGrid>
        </Wrapper>
      </Margin>
    </>
  )
};

export default dynamic(() => Promise.resolve(withAuth(FriendRequestsPage)), {
  ssr: false
});
