import Container from '@/components/Container';
import {
  Heading, Box, Text, Button, CardBody, Card, FormLabel, Input,
  Menu, MenuButton, MenuList, MenuItem, Flex, Textarea,
} from '@chakra-ui/react';
import { IoMdArrowDropdown } from 'react-icons/io';
import { useMemo, useState } from 'react';
import ContactApi from '@/API/ContactApi';

const Contact = () => {
  const [emailId, setEmailId] = useState<string>('');
  const [emailDomain, setEmailDomain] = useState<string>('');
  const [isManual, setIsManual] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const email = useMemo<string>(
    () => `${emailId}@${emailDomain}`,
    [emailDomain, emailId],
  );
  const domains = useMemo(() => [
    'gmail.com',
    'naver.com',
    'icloud.com',
    'hanmail.net',
    'kakao.com',
  ], []);
  const emailExp:RegExp = /^[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  const createContact = () => {
    if (!emailExp.test(email)) {
      window.alert('올바른 이메일을 입력해주세요.');
      return;
    }
    if (message.length === 0) {
      window.alert('내용을 입력해주세요.');
      return;
    }
    ContactApi.createContact({
      email, content: message,
    }).then(() => {
      window.alert('내용이 등록되었습니다. 빠른 시일 안에 연락드리도록 하겠습니다.');
      setMessage('');
      setEmailId('');
      setEmailDomain('');
    }).catch(() => {
      window.alert('오류가 발생하였습니다.');
    });
  };
  return (
        <Container backgroundColor='purple.400'
                   id='contact' >
            <Box pb={10}
                 pt={16}>
                <Heading color='white'>
                    Contact
                </Heading>
                <Card mt={4}>
                    <CardBody>
                        <FormLabel color='gray.600'
                                   fontWeight='500'>
                            이메일
                        </FormLabel>
                        <Flex align='center'
                              columnGap={2} >
                            <Input value={emailId}
                                   placeholder='이메일'
                                   focusBorderColor='purple.500'
                                   flex={1}
                                   onChange={(e) => setEmailId(e.target.value)} />
                            <Text>
                                @
                            </Text>
                            {isManual ? (
                                <Input value={emailDomain}
                                       flex={1}
                                       focusBorderColor='purple.500'
                                       onChange={(e) => setEmailDomain(e.target.value)} />
                            )
                              : (
                                    <Menu >
                                        <MenuButton as={Button}
                                                    variant='outline'
                                                    colorScheme='brand'
                                                    borderColor='gray.200'
                                                    fontWeight='400'
                                                    color={emailDomain ? 'gray.900' : 'gray.500'}
                                                    rightIcon={<IoMdArrowDropdown color='gray.500'/>}
                                                    textAlign='left'
                                                    flex={1}>
                                            {emailDomain || '이메일 선택'}
                                        </MenuButton>
                                        <MenuList>
                                            {domains.map((d) => (
                                                <MenuItem key={`domain ${d}`}
                                                          onClick={() => setEmailDomain(d)} >
                                                    {d}
                                                </MenuItem>
                                            ))}
                                            <MenuItem onClick={() => setIsManual(true)}>
                                                직접 입력
                                            </MenuItem>
                                        </MenuList>
                                    </Menu>
                              )}
                        </Flex>
                        <FormLabel color='gray.600'
                                   fontWeight='500'
                                   mt={4} >
                            내용
                        </FormLabel>
                        <Textarea value={message}
                                  placeholder='내용을 입력해주세요'
                                  onChange={(e) => setMessage(e.target.value)}
                                  focusBorderColor='purple.500'
                                  rows={6}
                                  resize='none' />
                        <Flex mt={4}
                              justify='flex-end'>
                            <Button colorScheme='purple'
                                    onClick={createContact} >
                                작성하기
                            </Button>
                        </Flex>
                    </CardBody>
                </Card>
            </Box>
        </Container>
  );
};

export default Contact;
