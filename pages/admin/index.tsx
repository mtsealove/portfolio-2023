import {
  Button, Flex, Heading, SimpleGrid, Box,
} from '@chakra-ui/react';
import { NextSeo } from 'next-seo';
import { useQuery } from 'react-query';
import ProjectApi from '@/API/ProjectApi';
import { useRouter } from 'next/router';
import Project from '@/components/Projects/Project';
import * as cookie from 'cookie';
import { GetServerSideProps } from 'next';
import { useContext } from 'react';
import UserContext from '@/context/UserContext';
import AuthApi from '@/API/AuthApi';
import AdminHeader from '@/components/admin/AdminHeader';

const AdminPage = () => {
  const { user } = useContext(UserContext);
  const { data: projects } = useQuery(
    ['projects'],
    async () => (await ProjectApi.getProjects()).data,
    { enabled: user !== undefined },
  );
  const router = useRouter();
  return (
        <Box backgroundColor='gray.50'
                 minH='100vh'>
            <AdminHeader/>
            <Flex direction='column'
                  w='100vw'
                  backgroundColor='gray.50'
                  px={10}
                  py={8}>
                <NextSeo title='포트폴리오 어드민'/>

                <Flex mb={4}
                      align='center'
                      justify='space-between'>
                    <Heading fontSize='2xl'>
                        프로젝트 관리
                    </Heading>
                    <Button colorScheme='teal'
                            onClick={() => router.push({ pathname: '/admin/edit' })}>
                        프로젝트 추가
                    </Button>
                </Flex>
                <SimpleGrid columns={5}
                            gap={4}>
                    {projects?.map((p) => (
                        <Project project={p}
                                 isAdmin
                                 key={`project ${p.id}`}/>
                    ))}
                </SimpleGrid>
            </Flex>
        </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const parsedCookies = cookie.parse(context.req.headers.cookie || '');
    const { accessToken } = parsedCookies;
    await AuthApi.setToken(accessToken);
    await AuthApi.getMe();
    return {
      props: {},
    };
  } catch {
    return {
      redirect: {
        destination: '/admin/sign-in',
        permanent: false,
      },
    };
  }
};

export default AdminPage;
