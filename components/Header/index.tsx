import {
  Flex, Text, Button, Icon, Box,
} from '@chakra-ui/react';
import { IoIosMenu, IoMdArrowBack } from 'react-icons/io';
import { IoCloseOutline } from 'react-icons/io5';
import {
  useContext, useEffect, useMemo, useState,
} from 'react';
import { useRouter } from 'next/router';
import { useRecoilState, useSetRecoilState } from 'recoil';
import ProjectContext from '@/context/ProjectContext';
// import { modalVisible, projectId } from '@/context/RecoilState';

const Header = () => {
  const router = useRouter();
  const [isWhite, setIsWhite] = useState<boolean>(false);
  const [expand, setExpand] = useState<boolean>(false);
  const { setProjectId, modalVisible, setModalVisible } = useContext(ProjectContext);
  const moveToTop = () => {
    if (modalVisible) {
      setModalVisible?.(false);
    } else {
      const main = document.querySelector<HTMLDivElement>('#main');
      main?.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  };
  const moveToSection = (id: string) => {
    setExpand(false);
    const main = document.querySelector<HTMLDivElement>('#main');
    const component = document.querySelector<HTMLDivElement>(`#${id}`);
    setModalVisible?.(false);
    if (component) {
      main?.scrollTo({ top: component.offsetTop, left: 0, behavior: 'smooth' });
    }
  };
  useEffect(() => {
    const main = document.querySelector<HTMLDivElement>('#main');
    const about = document.querySelector<HTMLDivElement>('#about');
    const onScroll = () => {
      if (main && about && main.scrollTop >= about.offsetTop) {
        setIsWhite(true);
      } else {
        setIsWhite(false);
      }
    };
    if (router.pathname === '/') {
      main?.addEventListener('scroll', onScroll);
    }
    main?.scrollTo({ top: 0, behavior: 'instant' });
    return () => {
      if (router.pathname === '/') {
        main?.removeEventListener('scroll', onScroll);
      }
    };
  }, [router.pathname]);
  const color = useMemo<string>(
    () => (isWhite ? 'gray.800' : 'white'),
    [isWhite],
  );
  const textOptions = useMemo(() => ({
    fontSize: 'lg',
    fontWeight: 'bold',
    color,
    cursor: 'pointer',
    transition: '200ms',
  }), [color]);
  useEffect(() => {
    if (router.query.projectId) {
      setIsWhite(true);
    }
  }, [router.query]);
  return (
        <Flex
              px={4}
              py={3}
              position='fixed'
              top={0}
              left={0}
              w='100%'
              zIndex={3}
              justify='center'
              transition='200ms'
              backgroundColor={isWhite ? 'white' : 'transparent'}
              boxShadow={isWhite ? '0 3px 6px rgba(0, 0, 0, 0.2)' : 'none'} >
            <Flex maxW='960px'
                  w='100%'
                  justify='space-between'
                  alignItems='center' >
              {modalVisible ? (<Icon as={IoMdArrowBack}
                                    w='28px'
                                    h='28px'
                                    cursor='pointer'
                                    onClick={() => {
                                      setModalVisible?.(false);
                                      const timeout = setTimeout(() => {
                                        setProjectId?.(-1);
                                      }, 500);
                                      return () => clearTimeout(timeout);
                                    }}
              />) : (
                  <Text {... textOptions}
                        onClick={moveToTop}>
                    HOME
                  </Text>
              )}
              <Flex columnGap={8}
                    display={{ base: 'none', md: 'flex' }}>
                <Text {...textOptions}
                      onClick={() => moveToSection('about')}>
                  ABOUT
                </Text>
                <Text {...textOptions}
                      onClick={() => moveToSection('career')}>
                  CAREER
                </Text>
                <Text {...textOptions}
                      onClick={() => moveToSection('skills')}>
                  SKILLS
                </Text>
                <Text {...textOptions}
                      onClick={() => moveToSection('projects')}>
                  PROJECTS
                </Text>
                <Text {...textOptions}
                      onClick={() => moveToSection('educations')}>
                  EDUCATIONS
                </Text>
                <Text {...textOptions}
                      onClick={() => moveToSection('contact')}>
                  CONTACT
                </Text>
              </Flex>
              <Button w={10}
                      h={10}
                      backgroundColor='transparent'
                      display={{ base: 'block', md: 'none' }}
                      onClick={() => setExpand(true)}>
                <Icon as={IoIosMenu}
                      w={8}
                      h={8}
                      color={isWhite ? 'gray.600' : 'white'}
                />
              </Button>
            </Flex>
          <Flex position='fixed'
                top={0}
                right={0}
                w='100%'
                h='100vh'
                direction='column'
                background='linear-gradient(161deg, rgba(2,0,36,1) 0%, rgba(9,9,121,0.6376925770308124) 97%, rgba(9,9,121,0.6376925770308124) 99%)'
                boxShadow='3px 0 6px rgba(0, 0, 0, 0.2)'
                transition='250ms'
                transform={expand ? 'none' : 'translateX(100%)'} >
            <Flex px={4}
                  py={3}
                  w='100%'
                  justify='flex-end'>
              <Button w={10}
                      h={10}
                      backgroundColor='gray.800'
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setExpand(false);
                      }} >
                <Icon as={IoCloseOutline}
                      color='white'
                      w={8}
                      h={8} />
              </Button>
            </Flex>
            <Flex px={6}
                  direction='column'
                  rowGap={6}>
              <Text fontSize='2xl'
                    color='white'
                    fontWeight='bold'
                    cursor='pointer'
                    onClick={() => moveToSection('about')}>
                ABOUT
              </Text>
              <Text fontSize='2xl'
                    color='white'
                    fontWeight='bold'
                    cursor='pointer'
                    onClick={() => moveToSection('career')}>
                CAREER
              </Text>
              <Text fontSize='2xl'
                    color='white'
                    fontWeight='bold'
                    cursor='pointer'
                    onClick={() => moveToSection('skills')}>
                SKILLS
              </Text>
              <Text fontSize='2xl'
                    color='white'
                    fontWeight='bold'
                    cursor='pointer'
                    onClick={() => moveToSection('projects')}>
                PROJECTS
              </Text>
              <Text fontSize='2xl'
                    color='white'
                    fontWeight='bold'
                    cursor='pointer'
                    onClick={() => moveToSection('educations')}>
                EDUCATIONS
              </Text>
              <Text fontSize='2xl'
                    color='white'
                    fontWeight='bold'
                    cursor='pointer'
                    onClick={() => moveToSection('contact')}>
                CONTACT
              </Text>
            </Flex>
          </Flex>
        </Flex>
  );
};

export default Header;
