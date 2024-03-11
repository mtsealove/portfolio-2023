import { NextSeo } from 'next-seo';
import About from '@/components/About';
import Landing from '@/components/Landing';
import Career from '@/components/Career';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import { GetServerSideProps } from 'next';
import ProjectApi from '@/API/ProjectApi';
import EducationCertification from '@/components/EducationCertification';
import Contact from '@/components/Contact';

interface Props {
    projects: Project[];
}

export default function Home({ projects }:Props) {
  return (
    <>
        <NextSeo title='개발자 이산해 포트폴리오'
                 description='개발자 이산해의 포트폴리오입니다.' />
        <Landing/>
        <About/>
        <Career/>
        <Skills/>
        <Projects projects={projects}/>
        <EducationCertification/>
        <Contact/>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const projects = (await ProjectApi.getProjects()).data;
  return {
    props: {
      projects,
    },
  };
};
