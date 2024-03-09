import {
  Flex, Heading, TableContainer, Table, Thead, Tbody, Tr, Th, Td, Card, CardBody,
} from '@chakra-ui/react';
import Container from '@/components/Container';
import { Fragment, useMemo } from 'react';

const SkillRow = (skillSet:SkillSet) => {
  const getRowSpan = (): number => {
    let max = 0;
    const { high, middle, low } = skillSet.skills;
    if (high.length > max) {
      max = high.length;
    }
    if (middle.length > max) {
      max = middle.length;
    }
    if (low.length > max) {
      max = low.length;
    }
    return max;
  };
  const rowSpan = useMemo<number>(() => getRowSpan(), [skillSet]);
  const arr = useMemo<string[][]>(() => {
    const { high, middle, low } = skillSet.skills;
    const result = [];
    for (let i = 0; i < rowSpan; i += 1) {
      let h = '';
      let m = '';
      let l = '';
      if (high.length > i) {
        h = high[i].name;
      }
      if (middle.length > i) {
        m = middle[i].name;
      }
      if (low.length > i) {
        l = low[i].name;
      }
      result.push([h, m, l]);
    }
    return result;
  }, [skillSet]);

  const firstLine = (
      <Fragment>
        <Tr display={{ base: 'table-row', md: 'none' }}>
          <Td fontWeight='600'
              backgroundColor='gray.50'
              textAlign='center'
              fontSize='sm'
              colSpan={3}>
            {skillSet.title}
          </Td>
        </Tr>
        <Tr>
          <Td rowSpan={rowSpan}
              display={{ base: 'none', md: 'table-cell' }}
              borderRightWidth={1}
              fontWeight='600'
              backgroundColor='gray.50'
              fontSize={{ base: 'md', lg: 'lg' }}>
            {skillSet.title}
          </Td>
          <Td borderRightWidth={1}
              color='gray.700'
              paddingX={{ base: 4, md: 6 }}
              fontWeight='500'>
            {arr[0][0]}
          </Td>
          <Td borderRightWidth={1}
              paddingX={{ base: 4, md: 6 }}
              color='gray.700'
              fontWeight='500'>
            {arr[0][1]}
          </Td>
          <Td color='gray.700'
              paddingX={{ base: 4, md: 6 }}
              fontWeight='500'>
            {arr[0][2]}
          </Td>
        </Tr>
      </Fragment>
  );
  return (
      <Fragment key={`line ${skillSet.title}`}>
        {firstLine}
        {arr.slice(1, arr.length).map((a, idx) => (
            <Tr key={`line ${skillSet.title} ${idx}`}
                color='gray.700'
                fontWeight='500'>
              <Td borderRightWidth={1}
                  paddingX={{ base: 4, md: 6 }}>
                {a[0]}
              </Td>
              <Td borderRightWidth={1}
                  paddingX={{ base: 4, md: 6 }}>
                {a[1]}
              </Td>
              <Td paddingX={{ base: 4, md: 6 }}>
                {a[2]}
              </Td>
            </Tr>
        ))}
      </Fragment>
  );
};

const Skills = () => {
  const skillSets = useMemo<SkillSet[]>(() => [
    {
      title: 'Language',
      skills: {
        high: [{ name: 'TypeScript' }, { name: 'JavaScript' }, { name: 'Java' }, { name: 'Kotlin' },
          { name: 'HTML' }, { name: 'CSS' }],
        middle: [{ name: 'Swift' }, { name: 'Python' }],
        low: [{ name: 'C' }, { name: 'C++' }, { name: 'Go' }],
      },
    },
    {
      title: 'FrontEnd',
      skills: {
        high: [{ name: 'React.js' }, { name: 'Next.js' }, { name: 'Scss(Sass)' }],
        middle: [{ name: 'Vue.js' }, { name: 'Nuxt.js' }, { name: 'Emotion' }, { name: 'Jsp' }],
        low: [{ name: 'Svelte.js' }],
      },
    },
    {
      title: 'Backend',
      skills: {
        high: [{ name: 'Nest.js' }, { name: 'Typeorm' }],
        middle: [{ name: 'Express.js' }],
        low: [{ name: 'Spring' }],
      },
    },
    {
      title: 'Database',
      skills: {
        high: [{ name: 'Postgresql' }, { name: 'MySQL' }],
        middle: [{ name: 'Firebase' }],
        low: [{ name: 'Oracle' }],
      },
    },
    {
      title: 'Mobile',
      skills: {
        high: [{ name: 'Android' }, { name: 'React Native' }],
        middle: [{ name: 'Ios' }],
        low: [{ name: 'SwiftUI' }, { name: 'Flutter' }],
      },
    },
    {
      title: 'Deploy',
      skills: {
        high: [{ name: 'GCP App engine' }, { name: 'Vercel' }],
        middle: [{ name: 'AWS EC2' }, { name: 'AWS Lightsail' }, { name: 'AWS S3' }],
        low: [{ name: 'Heroku' }, { name: 'Jenkins' }],
      },
    },
    {
      title: 'Tools',
      skills: {
        high: [{ name: 'Figma' }, { name: 'XD' }, { name: 'Slack' }, { name: 'Notion' }],
        middle: [{ name: 'Git' }],
        low: [{ name: 'Tensorflow' }],
      },
    },
  ], []);
  return (
        <Container backgroundColor='yellow.400'
                   id='skills' >
            <Flex pb={10}
                  pt={16}
                  direction='column'>
                <Heading>
                    Skills
                </Heading>
              <Card mt={4}>
                <CardBody>
                  <Table maxW='100%'>
                    <Thead backgroundColor='gray.50'>
                      <Tr>
                        <Th display={{ base: 'none', md: 'table-cell' }}>#</Th>
                        <Th>업무에 활용해요</Th>
                        <Th>어느정도 사용할 수 있어요</Th>
                        <Th>보고 이해할 수 있어요</Th>
                      </Tr>
                    </Thead>
                    <Tbody fontSize={{ base: 'xs', lg: 'md', md: 'sm' }}>
                      {skillSets.map((s, idx) => (
                          <SkillRow title={s.title}
                                    skills={s.skills}
                                    key={`skillRow ${idx}`} />
                      ))}
                    </Tbody>
                  </Table>
                </CardBody>
              </Card>
            </Flex>
        </Container>
  );
};

export default Skills;
