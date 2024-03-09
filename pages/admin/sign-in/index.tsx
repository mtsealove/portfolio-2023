import { useContext, useState } from 'react';
import UserContext from '@/context/UserContext';
import {
  Box, Button, Flex, FormLabel, Heading, Input,
} from '@chakra-ui/react';
import * as cookie from 'cookie';
import { NextSeo } from 'next-seo';
import AuthApi from '@/API/AuthApi';
import CookieManager from '@/Libs/CookieManager';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';

const SignInPage = () => {
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();
  const signIn = () => {
    AuthApi.signIn(email, password)
      .then(async (res) => {
        const { accessToken } = res.data;
        CookieManager.setCookie('accessToken', accessToken);
        AuthApi.setToken(accessToken);
        const user = (await AuthApi.getMe()).data;
        setUser?.(user);
        router.replace('/admin');
      }).catch(() => {
        window.alert('이메일과 비밀번호를 확인하세요');
      });
  };
  return (
      <Flex w='100vw'
           h='100vh'
            justify='center'
            align='center'
            direction='column'>
          <NextSeo title='어드민 로그인' />
          <Box maxW='500px'
               mb={12} >
              <Heading mb={4}>
                  로그인
              </Heading>
              <FormLabel>이메일</FormLabel>
              <Input value={email}
                     placeholder='이메일'
                     focusBorderColor='teal.400'
                     onChange={(e) => setEmail(e.target.value)} />
              <FormLabel mt={4}>비밀번호</FormLabel>
              <Input value={password}
                     placeholder='비밀번호'
                     focusBorderColor='teal.400'
                     type='password'
                     onChange={(e) => setPassword(e.target.value)}
                     onKeyDown={(e) => {
                       if (e.key === 'Enter') {
                         signIn();
                       }
                     }} />
              <Button mt={4}
                      w='100%'
                      colorScheme='teal'
                      onClick={signIn}>
                  로그인
              </Button>
          </Box>
      </Flex>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const parsedCookies = cookie.parse(context.req.headers.cookie || '');
    const { accessToken } = parsedCookies;
    await AuthApi.setToken(accessToken);
    await AuthApi.getMe();
    return {
      redirect: {
        destination: '/admin/sign-in',
        permanent: false,
      },
    };
  } catch {
    return {
      props: {

      },
    };
  }
};

export default SignInPage;
