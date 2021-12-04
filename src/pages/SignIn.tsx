import { useEffect, useState } from 'react';
import {
  Box,
  Text,
  Flex,
  Input,
  Button,
  Center,
  Heading,
  FormLabel,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';

import { auth } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { useError } from '../contexts/ErrorContext';
import { HeaderRow } from '../components/HeaderRow';

export function SignIn() {
  const history = useHistory();
  const { setError } = useError();
  const { currentUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pwValid, setPwValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const emailRegex =
    /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
  const emailError = 'Must be valid';
  const pwError = 'Must be 7 to 21 characters';

  const navigateToSignUp = () => history.push('/sign-up');

  const handleSignIn = async () => {
    setIsLoading(true);

    try {
      await auth.signInWithEmailAndPassword(email, password);
      setIsLoading(false);
      history.push('/dashboard');
    } catch (err) {
      setIsLoading(false);
      setError('Invalid credentials');
    }
  };

  useEffect(() => {
    if (emailRegex.test(email)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }

    // eslint-disable-next-line
  }, [email]);

  useEffect(() => {
    if (password.length > 6 && password.length < 22) {
      setPwValid(true);
    } else {
      setPwValid(false);
    }
  }, [password]);

  useEffect(() => {
    if (currentUser) history.push('/dashboard');

    // eslint-disable-next-line
  }, []);

  return (
    <Center
      backgroundImage='url(../assets/fw-bg.svg)'
      backgroundRepeat='no-repeat'
      backgroundSize='cover'
      pt='16'
      width='100vw'
      height='100vh'
      flexDirection='column'
    >
      <Box position='absolute' top='0' left='0'>
        <HeaderRow />
      </Box>

      <Heading alignSelf='start' ml={['16', '60']} mb='8'>
        Welcome back, Sign In!
      </Heading>

      <Flex flexDirection='column'>
        <FormControl isInvalid={!emailValid}>
          <FormLabel>Email:</FormLabel>
          <Input onChange={(e) => setEmail(e.target.value)} />
          <FormErrorMessage>{emailError}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!pwValid} mt={4}>
          <FormLabel>Password:</FormLabel>
          <Input onChange={(e) => setPassword(e.target.value)} />
          <FormErrorMessage>{pwError}</FormErrorMessage>
        </FormControl>

        <Text fontSize={14} mt={8}>
          Dont have an account?{' '}
          <Button
            onClick={navigateToSignUp}
            colorScheme='blue'
            variant='link'
            size='sm'
          >
            Sign Up!
          </Button>
        </Text>

        <Text fontSize={14} opacity='0'>
          or <Button size='sm' opacity='0' variant='link'></Button>
        </Text>

        <Button
          onClick={handleSignIn}
          mt={8}
          maxW='min-content'
          alignSelf='center'
          bgGradient='linear(to-l, teal.500,blue.500)'
          _hover={{
            bgGradient: 'linear(to-l, teal.600, blue.600)',
          }}
          isLoading={isLoading}
          isDisabled={!emailValid || !pwValid}
          type='submit'
        >
          Sign In
        </Button>
      </Flex>
    </Center>
  );
}
