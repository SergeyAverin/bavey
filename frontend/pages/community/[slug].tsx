import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'

import { Wrapper, ThreeColumnGrid, Margin } from '@shared/ui';
import { relationApi } from '@entities/relation';
import { CreatePublication } from '@features/createPublication';
import { Header } from '@widgets/header';
import { PublicationList } from '@widgets/publicationsList';
import { UserStatistic } from '@widgets/statistic/ui/UserStatistic';
import { CommunityInfo, ICommunity } from '@entities/community';
import { communityApi, useGetPublicationListQuery } from '@entities/community';
import { DateCreated } from '@widgets/dateCreated';
import { Store, wrapper } from '../../redux/store';
import { useGetCommunityPublicationListQuery } from '@entities/community/api/communityApi';
import { CommunityStatistic } from '@widgets/statistic/ui/CommunityStatistic';


interface IUserPageProps {
  community: ICommunity,
  publications: any
}
const UserPage: NextPage<IUserPageProps> = ({ community }) => {
  console.log(community.title)
  return (
    <>
      <Header />
      <Margin mt={80}>
        <CommunityInfo community={community} />
      </Margin>
      <Wrapper>
        <Margin mt={30}>
          <ThreeColumnGrid
            firstColumnSize='20%'
            secondColumnSize='60%'
            thirdColumnsSize='20%'
          >
            <DateCreated date={community.creation_date} />

            <div>
              <Margin mb={35}>
                <CreatePublication
                  wallSlug={community.title}
                  wallType='community' />
              </Margin>
              <PublicationList
                publicationsFromServerRender={[]}
                getPublication={() => useGetCommunityPublicationListQuery({title: community.title})}
              />
            </div>  

            <CommunityStatistic title={community.title} />
          </ThreeColumnGrid>
        </Margin>
      </Wrapper>
    </>
  ) 
};

export default UserPage;

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  
  (store: Store) => async (context: GetServerSidePropsContext) => {
    const title = context.query.slug as string;
    const communityRequest = await store.dispatch(communityApi.endpoints.getCommunity.initiate(title))
    await Promise.all(store.dispatch(communityApi.util.getRunningQueriesThunk()))
    const community = communityRequest.data;
    return {
      props: {
        community: community
      },
    }
  },
)
