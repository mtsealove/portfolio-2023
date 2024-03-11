import {
  AspectRatio, Box, Card, CardBody, Flex, Image, Text,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import ProjectContext from '@/context/ProjectContext';

interface Props {
    project: Project;
    isAdmin?: boolean;
}

const Project = ({ project, isAdmin }:Props) => {
  const { title, thumbnail, summary } = project;
  const { setProjectId, setModalVisible } = useContext(ProjectContext);
  const router = useRouter();
  const [hover, setHover] = useState<boolean>(false);
  const onClick = () => {
    if (!isAdmin) {
      // router.push({ pathname: '/', query: { projectId: project.id } });
      setProjectId?.(project.id);
      setModalVisible?.(true);
    } else {
      router.push({ pathname: '/admin/edit', query: { id: project.id } });
    }
  };
  return (
        <Card cursor='pointer'
              overflow='hidden'
              onClick={onClick}
              onMouseOver={() => setHover(true)}
              onMouseLeave={() => setHover(false)} >
            <AspectRatio ratio={4 / 3}>
                <Box position='relative'
                     overflow='hidden' >
                    <Image src={thumbnail}
                           w='100%'
                           h='100%'
                           objectFit='cover'
                           alt='' />
                    <Flex position='absolute'
                         w='100%'
                         h='100%'
                         backgroundColor='rgba(0, 0, 0, 0.6)'
                         transition='200ms ease-in-out'
                         transform={hover ? 'none' : 'translateY(100%)'}
                         justify='center'
                         align='center'
                         left={0}
                         top={0}>
                        <Text color='white'
                              fontSize='x-large'
                              fontWeight='600'>
                            Click!
                        </Text>
                    </Flex>
                </Box>

            </AspectRatio>
            <CardBody>
                <Text fontWeight='bold'
                      color='gray.700'>
                    {title}
                </Text>
                <Text fontWeight='500'
                      fontSize='sm'
                      color='gray.500' >
                    {summary}
                </Text>
            </CardBody>
        </Card>
  );
};

export default Project;
