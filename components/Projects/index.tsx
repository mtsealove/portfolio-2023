import Container from '@/components/Container';
import { Box, Heading, SimpleGrid } from '@chakra-ui/react';
import Project from '@/components/Projects/Project';
import ProjectModal from '@/components/ProjectModal';
import { useRecoilState } from 'recoil';
import { modalVisible, projectId } from '@/context/RecoilState';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface Props {
    projects: Project[];
}

const Projects = ({ projects }:Props) => {
  const [p, setProjectId] = useRecoilState(projectId);
  const [v, setModalVisible] = useRecoilState(modalVisible);
  const router = useRouter();
  useEffect(() => {
    if (typeof router.query.projectId === 'string' && !Number.isNaN(Number(router.query.projectId))) {
      setProjectId(Number(router.query.projectId));
      setModalVisible(true);
    } else {
      setModalVisible(false);
    }
  }, [router.query]);
  return (
        <Container backgroundColor='gray.100'
                   id='projects' >
            <Box pb={10}
                 pt={16}>
                <Heading mb={4}>
                    Projects
                </Heading>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }}
                            gap={4} >
                    {projects.map((project) => (
                        <Project project={project}
                                 key={`project ${project.id}`} />
                    ))}
                </SimpleGrid>
            </Box>
            <ProjectModal/>
        </Container>
  );
};

export default Projects;
