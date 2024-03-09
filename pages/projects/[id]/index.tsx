import { GetServerSideProps } from 'next';
import ProjectApi from '@/API/ProjectApi';
import {
  AspectRatio, Box, Image, Heading, Text, Flex, SimpleGrid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton, useDisclosure,
  Button,
  Icon,
} from '@chakra-ui/react';
import { GrNext, GrPrevious } from 'react-icons/gr';
import { NextSeo } from 'next-seo';
import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import { useRecoilState } from 'recoil';
import { prevPage } from '@/context/RecoilState';
import { useRouter } from 'next/router';
import styles from './index.module.scss';

interface Props {
    project: Project;
}

const ProjectPage = ({ project }:Props) => {
  const {
    title, summary, startAt, description, thumbnail, endAt, images,
  } = project;
  const [currentImg, setCurrentImg] = useState<string>('');
  const router = useRouter();
  // const [pre]
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [_, setPrevPage] = useRecoilState<string>(prevPage);
  const prevEnable = useMemo<boolean>(
    () => images.indexOf(currentImg) !== 0,
    [images, currentImg],
  );
  const nextEnable = useMemo<boolean>(
    () => images.indexOf(currentImg) !== images.length - 1,
    [images, currentImg],
  );
  const prev = () => {
    if (prevEnable) {
      const idx = images.indexOf(currentImg) - 1;
      setCurrentImg(images[idx]);
    }
  };
  const next = () => {
    if (nextEnable) {
      const idx = images.indexOf(currentImg) + 1;
      setCurrentImg(images[idx]);
    }
  };
  const currentIdx = useMemo<number>(() => images.indexOf(currentImg) + 1, [currentImg, images]);
  useEffect(() => {
    setPrevPage(router.pathname);
  }, [router]);
  return (
        <Box pt='51px'>
          <NextSeo title={`프로젝트 ${title}`}
                   description={description} />
          <AspectRatio ratio={{ base: 4 / 3, md: 4 }}>
            <Image src={thumbnail}
                   alt=''
                   objectFit='cover'
                   objectPosition='center'
                   w='100%'
                   h='100%' />
          </AspectRatio>
          <Box maxW='768px'
               w='100%'
               px={4}
               margin='0 auto' >
            <Heading mt={12}
                     fontSize={{ base: '3xl', md: 'xxx-large' }}
                     textAlign='center'>
              {title}
            </Heading>
              <Text textAlign='center'
                    color='gray.500'
                    fontWeight='500'
                    mt={2}>
                  {summary}
              </Text>
              <Box mt={6}>
                  <section className={styles.section}
                           dangerouslySetInnerHTML={{ __html: description }} />
              </Box>
              <SimpleGrid columns={{ base: 3, md: 5 }}
                          gap={4}>
                  {images.map((img) => (
                      <AspectRatio ratio={1}
                                   key={`img ${img}`}
                                   borderRadius='md'
                                   backgroundColor='gray.100'
                                   overflow='hidden'
                                   cursor='pointer'
                                   onClick={() => {
                                     setCurrentImg(img);
                                     onOpen();
                                   }} >
                          <Image src={img}
                                 alt='' />
                      </AspectRatio>
                  ))}
              </SimpleGrid>
              <Flex mt={8}
                    direction='column'
                    pb={40}
                    align='center'>
                  <Text fontWeight='600'
                        color='gray.700'>
                      프로젝트 기간
                  </Text>
                  <Flex align='center'
                        mt={2}
                        justify='center'
                        columnGap={2} >
                      <Text backgroundColor='gray.100'
                            fontSize='sm'
                            borderRadius='md'
                            fontWeight='500'
                            px={4}
                            py={2}>
                          {dayjs(startAt).format('YYYY.MM')}
                      </Text>
                      ~
                      <Text backgroundColor='gray.100'
                            fontSize='sm'
                            borderRadius='md'
                            fontWeight='500'
                            px={4}
                            py={2}>
                          {dayjs(endAt).format('YYYY.MM')}
                      </Text>
                  </Flex>
              </Flex>
          </Box>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>이미지 보기</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex maxH='60vh'
                              overflow='hidden'
                              align='center'>
                            {prevEnable ? (
                                <Icon as={GrPrevious}
                                      color='gray.700'
                                      cursor='pointer'
                                      w={8}
                                      h={8}
                                      onClick={prev}
                                />
                            ) : (
                                <Box w={8}
                                     h={8}>
                                </Box>
                            )}
                            <Image src={currentImg}
                                   objectFit='contain'
                                   maxW='100%'
                                   maxH='60vh'
                                   w='100%'
                                   alt=''/>
                            {nextEnable ? (
                                <Icon as={GrNext}
                                      color='gray.700'
                                      cursor='pointer'
                                      w={8}
                                      h={8}
                                      onClick={next}
                                />
                            ) : (
                                <Box w={8}
                                     h={8}>
                                </Box>
                            )}
                        </Flex>
                        <Text textAlign='center'
                              fontWeight='300'
                              color='gray.500'
                              fontSize='sm' >
                            {images.length} 중 {currentIdx} 번째
                        </Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>
                            닫기
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { id } = context.query;
    const project = (await ProjectApi.getProject(Number(id))).data;
    return {
      props: {
        project,
      },
    };
  } catch {
    return (
      {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
    );
  }
};

export default ProjectPage;
