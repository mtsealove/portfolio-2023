import { NextSeo } from 'next-seo';
import {
  Flex, Heading, TableContainer, Table, Thead, Tbody, Tr, Td, Th, Card, CardBody, Box,
} from '@chakra-ui/react';
import { useQuery } from 'react-query';
import ContactApi from '@/API/ContactApi';
import dayjs from 'dayjs';
import AdminHeader from '@/components/admin/AdminHeader';

const ContactsPage = () => {
  const { data: contacts } = useQuery(['contact'], async () => (await ContactApi.getContacts()).data);
  return (
        <Box minH='100vh'
             backgroundColor='gray.50'>
            <AdminHeader/>
            <Flex direction='column'
                  w='100vw'
                  px={10}
                  py={8}>
                <NextSeo title='포트폴리오 어드민' />
                <Heading fontSize='2xl'>
                    연락 확인
                </Heading>
                <Card mt={4}>
                    <CardBody>
                        <TableContainer>
                            <Table>
                                <Thead>
                                    <Tr backgroundColor='gray.50'>
                                        <Th>#</Th>
                                        <Th>email</Th>
                                        <Th>내용</Th>
                                        <Th>작성일</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {contacts?.map((c, i) => (
                                        <Tr key={`contact ${c.id}`}>
                                            <Td>{i + 1}</Td>
                                            <Td>{c.email}</Td>
                                            <Td>{c.content}</Td>
                                            <Td>{dayjs(c.createdAt).format('YYYY-MM-DD')}</Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </CardBody>
                </Card>
            </Flex>
        </Box>
  );
};

export default ContactsPage;
