import { useEffect, useState, FormEvent } from 'react';
import {
  Box,
  Input,
  Button,
  Center,
  FormLabel,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';

import { db } from '../firebase';
import { HeaderRow } from '../components/HeaderRow';
import { useAuth } from '../contexts/AuthContext';
import { useError } from '../contexts/ErrorContext';

export function EditUser() {
  const { currentUser } = useAuth();
  const { setError } = useError();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [nameValid, setNameValid] = useState(false);
  const history = useHistory();
  const nameRegex = /^[a-zA-Z0-9 ]*$/;
  const nameError = 'Must be 3 to 15 characters';

  const handleUserEdit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await db.collection('positions').doc(currentUser?.uid).update({
        name,
      });

      setIsLoading(false);
      history.push('/dashboard');
    } catch (err) {
      setIsLoading(false);
      setError('Something went wrong');
    }
  };

  useEffect(() => {
    if (nameRegex.test(name) && name.length > 2 && name.length < 16) {
      setNameValid(true);
    } else {
      setNameValid(false);
    }
    // eslint-disable-next-line
  }, [name]);

  return (
    <Box
      backgroundImage='url(../assets/fw-bg.svg)'
      backgroundRepeat='no-repeat'
      backgroundSize='cover'
      width='100vw'
      height='100vh'
    >
      <HeaderRow />

      <Center pt='24'>
        <form
          onSubmit={handleUserEdit}
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <FormControl isInvalid={!nameValid}>
            <FormLabel>Hedge Fund Name:</FormLabel>
            <Input
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <FormErrorMessage>{nameError}</FormErrorMessage>
          </FormControl>

          <Button
            mt={16}
            maxW='min-content'
            alignSelf='center'
            bgGradient='linear(to-l, teal.500,blue.500)'
            _hover={{
              bgGradient: 'linear(to-l, teal.600, blue.600)',
            }}
            isLoading={isLoading}
            isDisabled={!nameValid}
            type='submit'
          >
            Submit
          </Button>
        </form>
      </Center>
    </Box>
  );
}
