import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'

import { Wrapper, ThreeColumnGrid, Margin } from '@shared/ui';
import { userApi, IUser } from '@entities/User';
import { relationApi } from '@entities/relation';
import { CreatePublication } from '@features/createPublication';
import { Header } from '@widgets/header';
import { PublicationList } from '@widgets/publicationsList';
import { UserStatistic } from '@widgets/statistic/ui/UserStatistic';

import { Store, wrapper } from '../../redux/store';


interface IUserPageProps {
  user: IUser,
  publications: any,
  friends: any,
}
const UserPage: NextPage<IUserPageProps> = () => {
  return (
    
    <>
      <Header />
      <Margin mt={80}>
        m
      </Margin>
      <Wrapper>
        <Margin mt={30}>
          <ThreeColumnGrid
            firstColumnSize='20%'
            secondColumnSize='60%'
            thirdColumnsSize='20%'
          >
          
            <div>
              <Margin mb={35}>
                <CreatePublication
                  wallSlug=''
                  wallType='user' />
              </Margin>

            </div>  
          </ThreeColumnGrid>
        </Margin>
      </Wrapper>
    </>
  )
};

export default UserPage;

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  
  (store: Store) => async (context: GetServerSidePropsContext) => {
    
    
    return {
      props: {

      },
    }
  },
)
