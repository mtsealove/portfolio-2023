import {
  Card, CardBody, CardHeader, Flex, Heading, Box, Text,
} from '@chakra-ui/react';
import Image from 'next/image';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import styles from './index.module.scss';

interface Props {
    career: Career;
}

const CareerItem = ({ career }:Props) => {
  const {
    company, companyImg, items, role, startAt, endAt, roundIcon,
  } = career;
  const endDate = useMemo(() => {
    if (endAt) {
      return dayjs(endAt).format('YYYY.MM');
    }
    return 'now';
  }, [endAt]);
  const period = useMemo<number>(() => {
    if (endAt) {
      return dayjs(endAt).diff(dayjs(startAt), 'month');
    }
    return dayjs().diff(dayjs(startAt), 'month');
  }, [startAt, endAt]);
  return (
      <Card>
          <CardBody>
              <Flex align='center'>
                  <Box {... roundIcon && { borderRadius: '100%' }}
                      overflow='hidden'>
                      <Image src={companyImg}
                             className={styles.logo}
                             alt='' />
                  </Box>
                  <Heading fontSize='xl'
                           ml={2}>
                      {company}
                  </Heading>
              </Flex>
              <Text color='gray.500'
                    mt={2}
                    fontSize='small'
                    fontWeight='600'>
                  {dayjs(startAt).format('YYYY.MM')}
                  &nbsp;~&nbsp;
                  {endDate}
                  &nbsp;({period} mo.)
              </Text>
              <Text mt={2}
                    fontWeight='600'
                    fontSize='lg'
                    mb={4}>
                  Role: {role}
              </Text>
              <Flex direction='column'
                    rowGap={2}>
                  {items.map((item, idx) => (
                      <Box key={`item ${idx}`}>
                          <Text fontWeight='600'
                                color='gray.800'
                                mb={1}>
                              [{item.title}]
                          </Text>
                          <Flex flexDirection='column'>
                              {item.contents.map((content, jdx) => (
                                  <Text key={`content ${idx} ${jdx}`}
                                        fontSize='sm'
                                        fontWeight='500'
                                        color='gray.700'>
                                      {content}
                                  </Text>
                              ))}
                          </Flex>
                      </Box>
                  ))}
              </Flex>
          </CardBody>
      </Card>
  );
};

export default CareerItem;
