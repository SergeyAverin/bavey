import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'

import { Wrapper, ThreeColumnGrid, Margin } from '@shared/ui';
import { relationApi } from '@entities/relation';
import { CreatePublication } from '@features/createPublication';
import { Header } from '@widgets/header';
import { PublicationList } from '@widgets/publicationsList';
import { UserStatistic } from '@widgets/statistic/ui/UserStatistic';
import { CommunityInfo, CommunityMini, ICommunity } from '@entities/community';
import { communityApi, useGetPublicationListQuery } from '@entities/community';
import { DateCreated } from '@widgets/dateCreated';
import { Store, wrapper } from '../../redux/store';
import { useGetCommunityPublicationListQuery } from '@entities/community/api/communityApi';
import { CommunityStatistic } from '@widgets/statistic/ui/CommunityStatistic';
import dynamic from 'next/dynamic';
import { useGetSubscribQuery } from '@features/communityButton';


interface IUserPageProps {
  community: ICommunity,
  publications: any
}
const CommunityPage: NextPage<IUserPageProps> = ({ community }) => {
  const { data, isLoading } = useGetSubscribQuery(community.title);

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
              {!isLoading && (data.relationship_type == 'admin' || data.relationship_type == 'owner') && 
                <Margin mb={35}>
                  <CreatePublication
                    wallSlug={community.title}
                    wallType='community' />
                </Margin>  
              }
            
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

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  
  (store: Store) => async (context: GetServerSidePropsContext) => {
    const title = context.query.slug as string;
    const communityRequest = await store.dispatch(communityApi.endpoints.getCommunity.initiate(title))
    await Promise.all(store.dispatch(communityApi.util.getRunningQueriesThunk()))
    const community = communityRequest.data;

    if (!community) {
      return {
        props: {},
        notFound: true,
      };
    }

    return {
      props: {
        community: community
      },
    }
  },
)
export default dynamic(() => Promise.resolve(CommunityPage), {
  ssr: false
}); 