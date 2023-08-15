import React from 'react';
import Link from 'next/link';

import {
  UserInfoStyled,
  UserInfoTagStyled,
  UserInfoTitleStyled
} from './styled';
import { IUser } from '../model/types';
import { Margin } from '@shared/ui';

interface IUserInfoProps {
  user: IUser;
};

export const UserInfo: React.FC<IUserInfoProps> = ({ user }) => {
  return (
    <UserInfoStyled>
      <UserInfoTitleStyled>
        {user.first_name}
        &nbsp;
        {user.last_name}
      </UserInfoTitleStyled>
      <Link href={`/user/${user.username}`}>
        <UserInfoTagStyled>{user.username}</UserInfoTagStyled>
      </Link>
      <Margin mt={15}>
        <p>
        {user.description}
        </p>
      </Margin>
    </UserInfoStyled>
  );
};
