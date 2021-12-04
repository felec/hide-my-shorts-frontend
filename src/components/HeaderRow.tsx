import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Flex, useToast } from '@chakra-ui/react';

import { auth } from '../firebase';
import { Header } from './Header';
import { initialPosition } from '../App';
import { UserDrawer } from './UserDrawer';
import { LogoutButton } from './LogoutButton';
import { ModalHelpButton } from './ModalButton';
import { useAuth } from '../contexts/AuthContext';
import { useError } from '../contexts/ErrorContext';
import { usePosition } from '../contexts/PositionContext';

export const HeaderRow = () => {
  const { currentUser } = useAuth();
  const { error, setError } = useError();
  const { setPosition } = usePosition();
  const history = useHistory();
  const toast = useToast();

  const handleToastClosed = () => {
    setError('');
  };

  useEffect(() => {
    if (error) {
      toast({
        position: 'top',
        onCloseComplete: handleToastClosed,
        description: error,
        status: 'error',
        duration: 2000,
      });
    }
    // eslint-disable-next-line
  }, [error]);

  const handleLogout = async () => {
    try {
      await auth.signOut();

      setPosition(initialPosition);
      history.push('/');
    } catch (err) {
      setError(`Couldn't log out`);
    }
  };

  const navigateToIntro = () => history.push('/');

  return (
    <Flex py={2} mx={[2, 8]} alignItems='center' justifyContent='space-between'>
      <Header cb={navigateToIntro} />

      {currentUser && (
        <Flex alignItems='center' justifyContent='center'>
          <UserDrawer />

          <Box mr='2'>
            <ModalHelpButton />
          </Box>

          <LogoutButton cb={handleLogout} />
        </Flex>
      )}
    </Flex>
  );
};
