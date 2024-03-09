import {
  Box, Flex, Text, Heading, Card, CardBody, SimpleGrid, Icon, Link,
} from '@chakra-ui/react';
import Image from 'next/image';
import { AiOutlineHome } from 'react-icons/ai';
import { IoPhonePortraitOutline } from 'react-icons/io5';
import { MdOutlineEmail } from 'react-icons/md';
import { FaGithub } from 'react-icons/fa';
import { VscAccount } from 'react-icons/vsc';
import { FaComment } from 'react-icons/fa6';
import Container from '@/components/Container';
import ProfileImg from './img_profile.jpeg';
import styles from './index.module.scss';

/**
 * 최상단 자기소개 섹션
 * @constructor
 */
const About = () => {
  const a = '';
  return (
        <Container id='about'
                   backgroundColor='blue.500' >
            <Flex columnGap={10}
                  py={32}
                  direction={{ base: 'column', lg: 'row' }}
                  rowGap={{ base: 10, lg: 0 }}
                  align='center'>
                <Box>
                    <Image src={ProfileImg}
                           className={styles.profile}
                           alt='' />
                </Box>
                <Card flex={1}
                      w={{ base: '100%', lg: 'auto' }} >
                    <CardBody>
                        <Heading color='gray.700'
                                 mb={4}>
                            Full Stack Developer
                        </Heading>
                        <SimpleGrid gridTemplateColumns='auto 1fr'
                                    columnGap={6}
                                    rowGap={4}
                                    fontWeight='600'
                                    color='gray.600'>
                            <Icon as={VscAccount}
                                  w='24px'
                                  h='24px' />
                            <Text>
                                이산해
                            </Text>
                            <Icon as={AiOutlineHome}
                                  w='24px'
                                  h='24px'
                            />
                            <Text>
                                서울시 성동구
                            </Text>
                            <Icon as={IoPhonePortraitOutline}
                                  w='24px'
                                  h='24px'/>
                            <Text>
                                010-6346-1686
                            </Text>
                            <Icon as={MdOutlineEmail}
                                  w='24px'
                                  h='24px'/>
                            <Link href='mailto:mtsealove0927@gmail.com'>
                                mtsealove0927@gmail.com
                            </Link>
                            <Icon as={FaGithub}
                                  w='24px'
                                  h='24px' />
                            <Link href='https://github.com/mtsealove'
                                  target='_blank' >
                                https://github.com/mtsealove
                            </Link>
                            <Icon as={FaComment}
                                  w='24px'
                                  h='24px' />
                            <Text>
                                웹과 앱을 개발하고 성장을 지향하는 개발자입니다.
                            </Text>
                        </SimpleGrid>
                    </CardBody>
                </Card>
            </Flex>
        </Container>
  );
};

export default About;
