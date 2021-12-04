import { useRef } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import { SmallCloseIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';

const MotionAlertDialog = motion(AlertDialogContent);

const alertVariants = {
  hidden: {
    scale: 0.75,
  },
  visible: {
    scale: 1,
    transition: {
      duration: 0.75,
      type: 'spring',
      bounce: 0.6,
    },
  },
};

export function LogoutButton({ cb }: { cb: () => void }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  return (
    <>
      <IconButton
        onClick={onOpen}
        size='xs'
        variant='solid'
        colorScheme='gray'
        aria-label='Logout'
        icon={<SmallCloseIcon />}
        _focus={{ outline: 'none' }}
      />

      <AlertDialog
        motionPreset='none'
        leastDestructiveRef={cancelRef.current}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <MotionAlertDialog
          variants={alertVariants}
          initial='hidden'
          animate='visible'
          mx='2'
        >
          <AlertDialogHeader></AlertDialogHeader>
          <AlertDialogBody
            fontSize={['md', 'lg']}
            fontWeight='bold'
            display='flex'
            justifyContent='center'
          >
            Are you sure you want to logout?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button
              onClick={onClose}
              ref={cancelRef.current}
              _focus={{ outline: 'none' }}
              size='sm'
              mr='2'
              pt='3'
              pb='2'
              variant='ghost'
            >
              No
            </Button>
            <Button onClick={cb} pt='1' size='sm' colorScheme='blue'>
              Yes
            </Button>
          </AlertDialogFooter>
        </MotionAlertDialog>
      </AlertDialog>
    </>
  );
}
