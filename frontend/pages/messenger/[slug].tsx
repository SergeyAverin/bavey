import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { FillWrapper, TwoColumnGrid, Margin } from '@shared/ui';
import { withAuth } from '@entities/viewer';
import { Header } from '@widgets/header';
import { ChatList } from '@entities/messenger/ui/ChatList';
import { Message } from '@entities/messenger/ui/Message';
import { MessagesStyled } from '@entities/messenger/ui/styled';
import { MessagesList } from '@widgets/MessagesList/ui/MessagesList';


const FriendsPage: NextPage = () => {
  const router = useRouter();
  const slug = router.query.slug
  return (
    <>
            <Header />
            <FillWrapper>
                <TwoColumnGrid firstColumnSize='30%' secondColumnSize='70%'>
                <div>
                  <ChatList></ChatList>
                </div>
                <MessagesStyled>
                  <MessagesList slug={slug} />
                </MessagesStyled>
                </TwoColumnGrid>
            </FillWrapper>
    </>
  )
};

export default dynamic(() => Promise.resolve(withAuth(FriendsPage)), {
  ssr: false
});
