import { useRef, useState } from 'react';
import dayjs from 'dayjs';
import {
  AspectRatio,
  Box, Card, CardBody, Flex, FormLabel, Heading, Input, Textarea,
  Text, Image, Button, SimpleGrid, Icon,
} from '@chakra-ui/react';
import { NextSeo } from 'next-seo';
import { IoIosCloseCircle } from 'react-icons/io';
import ProjectApi, { CreateProjectDto } from '@/API/ProjectApi';
import { GetServerSideProps } from 'next';
import UploadApi from '@/API/UploadApi';
import Editor from '@/components/admin/Editor';

interface Props {
    project?: Project;
}

const EditPage = ({ project }:Props) => {
  const [title, setTitle] = useState<string>(project?.title || '');
  const [thumbnail, setThumbnail] = useState<string>(project?.thumbnail || '');
  const [summary, setSummary] = useState<string>(project?.summary || '');
  const today = dayjs().format('YYYY-MM-DD');
  const [startAt, setStartAt] = useState<string>(project?.startAt ? dayjs(project.startAt).format('YYYY-MM-DD') : today);
  const [endAt, setEndAt] = useState<string>(project?.endAt ? dayjs(project.endAt).format('YYYY-MM-DD') : today);
  const [description, setDescription] = useState<string>(project?.description || '');
  const [images, setImages] = useState<string[]>(project?.images || []);
  const fileRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const checkInput = () => {
    if (title.length === 0) {
      window.alert('프로젝트명');
      return;
    }
    if (thumbnail.length === 0) {
      window.alert('썸네일');
      return;
    }
    if (summary.length === 0) {
      window.alert('요약');
      return;
    }
    if (description.length === 0) {
      window.alert('설명');
      return;
    }
    const dto: CreateProjectDto = {
      title, description, endAt, startAt, summary, thumbnail, images,
    };
    if (project) {
      ProjectApi.updateProject(project.id, dto)
        .then(() => {
          window.alert('수정 완료');
        }).catch((e) => {
          window.alert('오류');
          console.error(e);
        });
    } else {
      ProjectApi.createProject(dto)
        .then(() => {
          window.alert('생성 완료');
        }).catch((e) => {
          window.alert('오류');
          console.error(e);
        });
    }
  };
  return (
      <Box w='100vw'
           h='100vh'
           backgroundColor='gray.50'
           overflowY='scroll'
           px={10}
           py={8}>
        <NextSeo title='포폴 어드민 수정' />
        <Box maxW='768px'
             margin='0 auto' >
          <Heading fontSize='2xl'
                   mb={4}>
            프로젝트 {project ? '수정' : '등록'}
          </Heading>
          <Card>
            <CardBody>
              <FormLabel fontWeight='500'>
                썸네일
              </FormLabel>
              <AspectRatio ratio={4 / 3}
                           borderRadius='xl'
                           overflow='hidden'
                           cursor='pointer'
                           onClick={() => fileRef.current?.click()}
                           mb={4}
                           w='300px'>
                {thumbnail ? (<Image src={thumbnail}
                                     style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                     alt='' />) : (
                    <Flex backgroundColor='gray.100'>
                      <Text fontWeight='600'>
                        썸네일 업로드
                      </Text>
                    </Flex>)}
              </AspectRatio>
              <input type='file'
                     accept='image/*'
                     ref={fileRef}
                     hidden
                     onChange={(e) => {
                       if (e.target.files && e.target.files?.length !== 0) {
                         const file = e.target.files[0];
                         UploadApi.uploadFile(file)
                           .then((res) => {
                             setThumbnail(res.data);
                           }).catch((reason) => {
                             console.error(reason);
                             window.alert('오류 발생');
                           });
                       }
                     }}
              />
              <FormLabel fontWeight='500'>
                프로젝트명
              </FormLabel>
              <Input value={title}
                     placeholder='프로젝트명'
                     onChange={(e) => setTitle(e.target.value)}
                     mb={4}/>
              <FormLabel fontWeight='500'>
                기간
              </FormLabel>
              <Flex mb={4}
                    align='center'
                    columnGap={4} >
                <Input type='date'
                       value={startAt}
                       onChange={(e) => setStartAt(e.target.value)} />
                ~
                <Input type='date'
                       value={endAt}
                       onChange={(e) => setEndAt(e.target.value)} />
              </Flex>
              <FormLabel fontWeight='500'>
                요약
              </FormLabel>
              <Textarea value={summary}
                     placeholder='요약'
                     onChange={(e) => setSummary(e.target.value)} rows={2}
                     mb={4}/>
              {/*
              <FormLabel fontWeight='500'>
                프로젝트 역할
              </FormLabel>
              <Box mb={4}>
                <Editor content={role}
                        setContent={setRole}
                        minHeight={500}/>
              </Box>
              <FormLabel fontWeight='500'>
                프로젝트 결과
              </FormLabel>
              <Box mb={4}>
                <Editor content={result}
                        setContent={setResult}
                        minHeight={500}/>
              </Box>
              */}

            </CardBody>
          </Card>
          <Card mt={4}>
            <CardBody>
              <FormLabel fontWeight='500'>
                프로젝트 설명
              </FormLabel>
              <Box mb={4}>
                <Editor content={description}
                        setContent={setDescription}
                        minHeight={500}/>
              </Box>
            </CardBody>
          </Card>
          <Card mt={4}
                mb={3} >
            <CardBody>
              <FormLabel fontWeight='500'>
                이미지
              </FormLabel>
              <input type='file'
                     accept='image/*'
                     ref={imageRef}
                     hidden
                     onChange={(e) => {
                       if (e.target.files && e.target.files?.length !== 0) {
                         const file = e.target.files[0];
                         UploadApi.uploadFile(file)
                           .then((res) => {
                             setImages([...images, res.data]);
                           }).catch((reason) => {
                             console.error(reason);
                             window.alert('오류 발생');
                           });
                       }
                     }}
              />
              <SimpleGrid columns={5}
                          gap={4}>
                {images.map((img) => (
                    <Box key={`img ${img}`}
                         position='relative' >
                      <AspectRatio ratio={1}
                                   borderRadius='md'
                                   backgroundColor='gray.100'
                                   overflow='hidden' >
                        <Image src={img}
                               alt='' />
                      </AspectRatio>
                      <Icon as={IoIosCloseCircle}
                            w={8}
                            h={8}
                            right={-4}
                            top={-4}
                            color='red.500'
                            cursor='pointer'
                            position='absolute'
                            onClick={() => {
                              setImages(images.filter((i) => i !== img));
                            }}
                      />
                    </Box>
                ))}
              </SimpleGrid>
              <Flex justify='flex-end'>
                <Button onClick={() => imageRef.current?.click()}>이미지 추가</Button>
              </Flex>
            </CardBody>
          </Card>
          <Flex justify='flex-end'>
            <Button colorScheme='teal'
                    onClick={checkInput} >
              {project ? '수정' : '등록'}하기
            </Button>
          </Flex>
        </Box>
      </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const nId = Number(id);
  if (!Number.isNaN(nId)) {
    const project = (await ProjectApi.getProject(nId)).data;
    return {
      props: {
        project,
      },
    };
  }
  return {
    props: {},
  };
};

export default EditPage;
