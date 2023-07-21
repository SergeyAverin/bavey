import React, { useState } from "react"
import { useRouter } from 'next/router';
import Link from "next/link";

import { AuthFormStyled, AuthLayoutStyled, FormTitle, SubmitStyled, ValidateFail } from './styled';
import { Margin, Flex, Input } from '@shared/ui';
import { useRegistrationMutation } from "@entities/viewer";

import BaveyLogo from "@public/baveyLogo.svg"


export const RegistrationForm: React.FC = () => {
  const [registration, error] = useRegistrationMutation();
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');


  const submitHandler = (event: React.SyntheticEvent) => {
    event.preventDefault();
    registration({
        email,
        first_name: firstName,
        last_name: lastName,
        password: password1,
        username
    })
    if (error.status != 'rejected') {
      router.push('/login')
    }
  };

  return (
    <AuthLayoutStyled>
      <BaveyLogo />
      <FormTitle>Sign in to Bevyes</FormTitle>
      <AuthFormStyled onSubmit={submitHandler}>
        <Margin mb={15}>
          <Input attrName='username' labelText='Имя пользователя' inputValues={username} setInputValues={setUsername} />
        </Margin>
        <Margin mb={15}>
          <Input attrName='first_name' labelText='Имя' inputValues={firstName} setInputValues={setFirstName} />
        </Margin>
        <Margin mb={15}>
          <Input attrName='last_name' labelText='Фамилия' inputValues={lastName} setInputValues={setLastName} />
        </Margin>
        <Margin mb={15}>
          <Input attrName='email' labelText='Почта' inputValues={email} setInputValues={setEmail} />
        </Margin>
        <Margin mb={15}>
          <Input attrName='password' labelText='Пароль' attrType='password' inputValues={password1} setInputValues={setPassword1} />
        </Margin>
        <Margin mb={15}>
          <Input attrName='password' labelText='Повтор пароля' attrType='password' inputValues={password2} setInputValues={setPassword2} />
        </Margin>
        <Flex justifyContent='space-between' alignItems='flex-start'>
          <div>
            <Margin mt={15}>
              <Link href="/login">Вход</Link>
            </Margin>
          </div>
        </Flex>
        { password1 != password2
          && <ValidateFail>Пароли не совпадают</ValidateFail>
        }
          { error.status == 'rejected' && <ValidateFail>Никнейм занят</ValidateFail> }
        
        <SubmitStyled value='Зарегистрировать'/>
      </AuthFormStyled>
    </AuthLayoutStyled>
  )
};
