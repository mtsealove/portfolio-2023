import {
  SimpleGrid, Card, CardBody, Heading, UnorderedList, ListItem, ListIcon, List, Box,
} from '@chakra-ui/react';
import { MdOutlineSchool, MdFoundation } from 'react-icons/md';
import { FaScrewdriverWrench } from 'react-icons/fa6';
import { FaAward } from 'react-icons/fa';
import { SiTensorflow } from 'react-icons/si';
import { GrCheckboxSelected } from 'react-icons/gr';
import Container from '@/components/Container';

const EducationCertification = () => {
  const a = '';
  return (
        <Container backgroundColor='orange.300'
                   id='educations'>
            <Box pb={10}
                 pt={16}>
                <SimpleGrid columns={{ base: 1, md: 2 }}
                            gap={4}>
                    <Card>
                        <CardBody>
                            <Heading fontSize='3xl'
                                     mb={4}>
                                Education
                            </Heading>
                            <List spacing={2}
                                  fontWeight='500'
                                  color='gray.700' >
                                <ListItem>
                                    <ListIcon as={MdOutlineSchool}
                                              color='green.500' />
                                    건국대학교 사범대학 부속고등학교 졸업 (2015.03)
                                </ListItem>
                                <ListItem>
                                    <ListIcon as={MdFoundation}
                                              color='blue.500' />
                                    물류산업진흥재단 (창업)인큐베이팅 수료(2019.12)
                                </ListItem>
                                <ListItem>
                                    <ListIcon as={MdOutlineSchool}
                                              color='green.500'/>
                                    가천대학교 컴퓨터공학과 졸업 (2021.08)
                                </ListItem>
                            </List>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardBody>
                            <Heading fontSize='3xl'
                                     mb={4}>
                                Awards
                            </Heading>
                            <List spacing={2}
                                  fontWeight='500'
                                  color='gray.700' >
                                <ListItem>
                                    <ListIcon as={FaAward}
                                              color='yellow.400' />
                                    2018 물류 아이디어톤 최우수상
                                </ListItem>
                                <ListItem>
                                    <ListIcon as={FaAward}
                                              color='yellow.400' />
                                    2019 학생창업 유망팀 u300 선정
                                </ListItem>
                                <ListItem>
                                    <ListIcon as={GrCheckboxSelected}
                                              color='green.400' />
                                    2019 일반 2차 예비창업 패키지 선정
                                </ListItem>
                            </List>
                        </CardBody>
                    </Card>
                </SimpleGrid>
                <Card mt={4}>
                    <CardBody>
                        <Heading fontSize='3xl'
                                 mb={4}>
                            Certifications
                        </Heading>
                        <List fontWeight='500'
                              flexDirection={{ base: 'column', md: 'row' }}
                              rowGap={2}
                              display='flex'
                              color='gray.700' >
                            <ListItem flex={1}>
                                <ListIcon as={FaScrewdriverWrench}
                                          color='blue.600' />
                                정보처리기사 (2021.11)
                            </ListItem>
                            <ListItem flex={1}>
                                <ListIcon as={SiTensorflow}
                                          color='orange.500' />
                                Tensorflow Developer Certification (2023.03)
                            </ListItem>
                        </List>
                    </CardBody>
                </Card>
            </Box>
        </Container>
  );
};

export default EducationCertification;
