import {
  Heading, SimpleGrid, Box,
} from '@chakra-ui/react';
import Container from '@/components/Container';
import { useMemo } from 'react';
import dayjs from 'dayjs';
import CareerItem from '@/components/Career/CareerItem';
import BusLinkerLogo from './ic_buslinker.png';
import ViPetLogo from './ic_vipet.png';
import FiPublicLogo from './ic_fipublic.svg';
import GeekbleLogo from './ic_geebkle.jpg';

const Career = () => {
  const careers = useMemo<Career[]>(() => [
    {
      company: '버스링커',
      companyImg: BusLinkerLogo,
      startAt: dayjs('2019-08-01').toDate(),
      endAt: dayjs('2020-06-01').toDate(),
      role: '안드로이드, 프론트엔드, 백엔드',
      items: [{
        title: '웹 개발',
        contents: ['화물 운송 및 배차 API 개발(express)',
          '화물 운송 및 배차 관리 백오피스 개발(ejs)'],
      },
      {
        title: '안드로이드 애플리케이션 개발',
        contents: ['버스 승하차 플랫폼 개발(Java)',
          '화물 운송관리 플랫폼 개발(Java)'],
      }],
    },
    {
      company: '브이아이펫',
      companyImg: ViPetLogo,
      roundIcon: true,
      startAt: dayjs('2020-06-01').toDate(),
      endAt: dayjs('2021-03-01').toDate(),
      role: '안드로이드, 프론트엔드, 백엔드',
      items: [{
        title: '웹 개발',
        contents: [
          '반려동물 케어 예약 API 개발 (express)',
          '반려동물 케어 예약 사이트 개발(ejs)',
          '3D 모델링 사업 랜딩 페이지 개발(React)',
        ],
      },
      {
        title: '안드로이드 개발',
        contents: [
          '반려동움 케어 예약 애플리케이션 개발(Kotlin)',
          '당뇨케어 애플리케이션 개발(React native)',
        ],
      }],
    }, {
      company: '파이퍼블릭',
      companyImg: FiPublicLogo,
      startAt: dayjs('2021-03-01').toDate(),
      endAt: dayjs('2022-07-15').toDate(),
      role: '프론트엔드, 모바일',
      items: [
        {
          title: '웹개발',
          contents: [
            '리얼바이 공식 홈페이지 프론트 리뉴얼(React)',
            '부동산 정보 블로그 프론트 개발(next.js)'],
        },
        {
          title: '모바일',
          contents: [
            '부동산 투자 플랫폼 개발(React native, Swift, Kotlin)',
          ],
        },
      ],
    },
    {
      company: '긱블',
      companyImg: GeekbleLogo,
      roundIcon: true,
      startAt: dayjs('2022-07-18').toDate(),
      endAt: dayjs('2024-02-16').toDate(),
      role: '프론트엔드 개발, 백엔드 개발, 백오피스 개발',
      items: [
        {
          title: '프론트엔드',
          contents: ['긱블 공식 홈페이지 개발(next.js)',
            '교육 플랫폼 긱블 에듀 개발(next.js)',
            '폰트 소개 및 다운로드 사이트 개발(svelte)',
            '벤츠X긱블 스템프 이벤트 페이지 개발(next.js)',
            '이과생 짤메이커(캐릭터 꾸미기) 웹 사이트 개발',
          ],
        },
        {
          title: '백오피스',
          contents: [
            '이과생 짤메이커 백오피스 개발(react)',
            '공식 홈페이지 백오피스 개발(next.js)',
            '교욱 플랫폼 백오피스 개발(next.js, chakraui)',
          ],
        },
        {
          title: '모바일',
          contents: [
            '이과생 짤메이커 패키징 및 CRM 애플리케이션 개발(React native)',
            'AI 조향 머신 인터렉션 애플리케이션 개발(Android)',
            '클라이밍 정보 공유 서비스 행클 개발(React native)',
          ],
        },
        {
          title: '백엔드',
          contents: ['긱블 에듀 백엔드 개발(nest.js)',
            '공식 홈페이지 백엔드 개발(nest.js)',
            'AI 조향 머신 백엔드 개발'],
        },
        {
          title: '기타',
          contents: [
            '사내 마니또 슬랙봇 개발',
            '사내 HR 뉴스레터 슬랙봇 및 어드민 개발',
            '사내 스크럼 작성 슬랙봇 개발',
            '사내 IR, 발표 자료 제작용 워드클라우드 생성기 개발',
          ],
        },
      ],
    },
  ].sort((a, b) => {
    if (a.startAt > b.startAt) {
      return -1;
    }
    if (b.startAt > a.startAt) {
      return 1;
    }
    return 0;
  }), []);
  return (
        <Container backgroundColor='teal.300'
                   id='career' >
          <Box pb={10}
               pt={16} >
            <Heading fontSize='3xl'
                     color='white'
                     mb={4}>
              Career
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }}
                        rowGap={4}
                        columnGap={4}>
              {careers.map((c) => (
                  <CareerItem career={c}
                              key={`career ${c.company}`} />
              ))}
            </SimpleGrid>
          </Box>
        </Container>
  );
};

export default Career;
