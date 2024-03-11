import {
  AspectRatio,
  Box, Button,
  Flex,
  Heading, Icon,
  Image,
  Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { modalVisible, projectId } from '@/context/RecoilState';
import {
  useEffect, useMemo, useRef, useState,
} from 'react';
import { useQuery } from 'react-query';
import ProjectApi from '@/API/ProjectApi';
import dayjs from 'dayjs';
import { GrNext, GrPrevious } from 'react-icons/gr';
import styles from './index.module.scss';

const ProjectModal = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isVisible = useRecoilValue<boolean>(modalVisible);
  const [progress, setProgress] = useState<number>(0);
  const pid = useRecoilValue(projectId);
  const { data: project } = useQuery(['project', pid], async () => (await ProjectApi.getProject(pid)).data, {
    enabled: pid !== -1,
  });
  const images = useMemo<string[]>(() => {
    if (project) {
      return project.images;
    }
    return [];
  }, [project]);
  const [currentImg, setCurrentImg] = useState<string>('');
  const { onOpen, onClose, isOpen } = useDisclosure();
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
    scrollRef.current?.scrollTo({ top: 0, behavior: 'instant' });
  }, [pid]);
  return (
        <Box w='100vw'
             h='100vh'
             position='fixed'
             left={0}
             top={0}
             backgroundColor='white'
             transition='transform 500ms ease-in'
             overflowY='scroll'
             transform={isVisible ? 'none' : 'translateX(100vw)'}
             zIndex={2}
             ref={scrollRef}
             onScroll={(e) => {
               if ('scrollTop' in e.target && 'scrollHeight' in e.target && 'offsetHeight' in e.target) {
                 const { scrollTop, scrollHeight, offsetHeight } = e.target;
                 setProgress((100 * Number(scrollTop)) / (Number(scrollHeight) - Number(offsetHeight)));
               }
             }}
             className={styles.container}
        >
            <Box w='100%'
                 h='2px'
                 position='sticky'
                 zIndex={2}
                 className={styles.progress}>
                <Box backgroundColor='teal.500'
                     w={`${progress}%`}
                     h='100%' />
            </Box>
            <Box position='relative'>
                {project && (
                    <AspectRatio ratio={{ base: 4 / 3, md: 4 }}>
                        <Image src={project?.thumbnail}
                               alt=''
                               objectFit='cover'
                               objectPosition='center'
                               w='100%'
                               h='100%' />
                    </AspectRatio>
                )}
                <Box maxW='768px'
                     w='100%'
                     px={4}
                     margin='0 auto' >
                    <Heading mt={12}
                             fontSize={{ base: '3xl', md: 'xxx-large' }}
                             textAlign='center'>
                        {project?.title}
                    </Heading>
                    <Text textAlign='center'
                          color='gray.500'
                          fontWeight='500'
                          mt={4}>
                        {project?.summary}
                    </Text>
                    <Box mt={8}>
                        <section className={styles.section}
                                 dangerouslySetInnerHTML={{ __html: project?.description || '' }} />
                    </Box>
                    {images.length !== 0 && (
                        <SimpleGrid columns={{ base: 3, md: 5 }}
                                    mt={4}
                                    gap={4}>
                            {images.map((img) => (
                                <AspectRatio ratio={1}
                                             key={`img ${img}`}
                                             borderRadius='md'
                                             backgroundColor='white'
                                             overflow='hidden'
                                             cursor='pointer'
                                             boxShadow='0 2px 6px rgba(0, 0, 0, 0.4)'
                                             className={styles.thumbnail}
                                             onClick={() => {
                                               setCurrentImg(img);
                                               onOpen();
                                             }} >
                                    <Image src={img}
                                           alt='' />
                                </AspectRatio>
                            ))}
                        </SimpleGrid>
                    )}
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
                                {dayjs(project?.startAt).format('YYYY.MM')}
                            </Text>
                            ~
                            <Text backgroundColor='gray.100'
                                  fontSize='sm'
                                  borderRadius='md'
                                  fontWeight='500'
                                  px={4}
                                  py={2}>
                                {dayjs(project?.endAt).format('YYYY.MM')}
                            </Text>
                        </Flex>
                    </Flex>
                </Box>
                <Modal isOpen={isOpen} onClose={onClose}
                       size='3xl'>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>이미지 보기</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Flex maxH='60vh'
                                  w='100%'
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
                                <Box flex={1}>
                                    <Image src={currentImg}
                                           objectFit='contain'

                                           maxW='100%'
                                           maxH='60vh'
                                           w='100%'
                                           alt=''/>
                                </Box>
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
                                  fontWeight='400'
                                  color='gray.500'
                                  mt={2}
                                  fontSize='sm' >
                                {images.length}개 중 {currentIdx} 번째
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
        </Box>
  );
};

export default ProjectModal;
