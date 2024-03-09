import { Box, Flex } from '@chakra-ui/react';
import Image from 'next/image';
import { TypeAnimation } from 'react-type-animation';
import BgLanding from './bg_landing.jpg';
import styles from './styles.module.scss';
import ArrowDown from './ic_arrow_down.svg';

const Landing = () => {
  const scrollDown = () => {
    const main = document.querySelector<HTMLDivElement>('#main');
    const about = document.querySelector<HTMLDivElement>('#about');
    if (about) {
      main?.scrollTo({ top: about.offsetTop, behavior: 'smooth' });
    }
  };
  return (
        <Flex w='100vw'
             position='relative'
             justifyContent='center'
             alignItems='center'
             className={styles.container}>
            <Image src={BgLanding}
                   className={styles.img}
                   alt='랜딩'/>
            <div className={styles.blur}/>
            <Box position='relative'>
                <TypeAnimation
                    sequence={[
                      // Same substring at the start will only be typed out once, initially
                      '',
                      1000,
                      '안녕하세요',
                      1000, // wait 1s before replacing "Mice" with "Hamsters"
                      '개발자 이산해의 포트폴리오입니다',
                      2000,
                    ]}
                    wrapper="h1"
                    speed={50}
                    className={styles.wording}
                    repeat={Infinity}
                />
            </Box>
            <Image src={ArrowDown}
                   className={styles.arrow}
                   onClick={scrollDown}
                   alt='내려가기' />
        </Flex>
  );
};

export default Landing;
