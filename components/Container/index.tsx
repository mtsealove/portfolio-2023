import { ReactNode } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import * as CSS from 'csstype';

interface Props {
    children?: ReactNode;
    id?: string;
    backgroundColor?: string;
}

/**
 * 가운데 정렬 및 크기 제한 컨테이너
 * @param children
 * @param id
 * @param backgroundColor
 * @constructor
 */
const Container = ({ children, id, backgroundColor }:Props) => (
    <Box w='100%'
         id={id}
         px={{ md: 10, base: 5 }}
         backgroundColor={backgroundColor}>
        <Flex direction='column'
              margin='0 auto'
              maxW='960px'>
            {children}
        </Flex>
    </Box>
);

export default Container;
