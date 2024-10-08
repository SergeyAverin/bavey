import type { NextPage } from 'next'
import { useRouter } from 'next/router';

import { Wrapper, TwoColumnGrid, Margin } from '@shared/ui';
import { withAuth } from '@entities/viewer';
import { useSearchQuery } from '@features/search';
import { Header } from '@widgets/header';
import { SearchFillterSideBar } from '@widgets/navigationsSideBars';
import dynamic from 'next/dynamic';


const SavedPublicationPage: NextPage = () => {
  const router = useRouter();
  let search = '';
  if (router.query['search']) {
    search = router.query['search'] as string
  }
  const { data, isLoading } = useSearchQuery({search, fillter: router.query['fillter']});
  if (router.query['fillter']) { 
    console.log(router.query['fillter'])
  }
  return (
    <>
      <Header />
      <Margin mt={100}>
        <Wrapper>
          <TwoColumnGrid firstColumnSize='70%' secondColumnSize='30%'>
            <div>
                {!isLoading && router.query['fillter']  && data.map((user) => (
                  <Margin mt={30} >
                    <a href={`/${router.query['fillter'] == 'user'? 'user':'community'}/${router.query['fillter'] == 'user'? user.username:user.title}`}>
                      {router.query['fillter'] == 'user'? user.username:user.title}
                    </a>
                  </Margin>
                ))}   
                {!isLoading && router.query['fillter']  && data.length == 0 &&
                  <h2>Ничего не найдено</h2>
                }
            </div>
            <SearchFillterSideBar search={search}/>
          </TwoColumnGrid>
        </Wrapper>
      </Margin>
    </>
  )
};


export default dynamic(() => Promise.resolve(withAuth(SavedPublicationPage)), {
  ssr: false
});
// 