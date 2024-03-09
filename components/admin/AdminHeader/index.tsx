import {
  Flex, Heading, Link,
} from '@chakra-ui/react';

const AdminHeader = () => (
        <Flex w='100%'
              backgroundColor='white'
              paddingX={12}
              paddingY={4}
              mb={4}
              alignItems='center'
              justifyContent='space-between'
              boxShadow='0 0 6px rgba(0, 0, 0, 0.3)'>
            <Heading fontSize='2xl'>
                포트폴리오 어드민
            </Heading>
            <Flex alignItems='center'
                  columnGap={4}>
                <Link href='/admin'
                      fontWeight='600'
                      color='teal.500'
                      fontSize='lg'>
                    프로젝트
                </Link>
                <Link href='/admin/contacts'
                      fontWeight='600'
                      color='teal.500'
                      fontSize='lg'>
                    연락
                </Link>
            </Flex>
        </Flex>
);

export default AdminHeader;
