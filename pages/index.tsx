import { NextSeo } from 'next-seo';
import Container from '@/components/Container';
import About from '@/components/About';
import Landing from '@/components/Landing';
import Career from '@/components/Career';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import { GetServerSideProps } from 'next';
import ProjectApi from '@/API/ProjectApi';
import EducationCertification from '@/components/EducationCertification';
import Contact from '@/components/Contact';
import { useRecoilValue } from 'recoil';
import { prevPage } from '@/context/RecoilState';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

interface Props {
    projects: Project[];
}

export default function Home({ projects }:Props) {
  const prev = useRecoilValue(prevPage);
  const router = useRouter();
  useEffect(() => {
    const main = document.querySelector<HTMLDivElement>('#main');
    const project = document.querySelector<HTMLDivElement>('#projects');
    if (main && project && prev.startsWith('/project')) {
      const { offsetTop } = project;
      main?.scrollTo({ top: offsetTop, left: 0 });
    }
  }, [router.pathname, prev]);
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
