import {
  List,
  ListItem,
  Divider,
  Text,
  Icon,
  Modal,
  ModalBody,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  ModalCloseButton,
  ModalContentProps,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { InfoOutlineIcon } from '@chakra-ui/icons';

import { Strategy } from '../types/types';

const MotionModalContent = motion<ModalContentProps>(ModalContent);

const modalVariants = {
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

export function ModalInfoIcon({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Icon
        onClick={onOpen}
        icon={<InfoOutlineIcon />}
        variant='unstyled'
        cursor='pointer'
        ml='2'
        mt='0.5'
        aria-label='More Info'
      />

      <Modal
        motionPreset='none'
        scrollBehavior={'inside'}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <MotionModalContent
          variants={modalVariants}
          initial='hidden'
          animate='visible'
          alignSelf='center'
          mx='2'
        >
          <ModalHeader alignSelf='center'>{title}</ModalHeader>
          <ModalCloseButton _focus={{ outline: 'none' }} />
          <ModalBody fontSize='sm'>{content}</ModalBody>
        </MotionModalContent>
      </Modal>
    </>
  );
}

export function StrategiesModalInfoIcon({
  strategies,
}: {
  strategies: Strategy[];
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const renderInfoList = () => {
    return strategies.map((s, i) => {
      return (
        <ListItem key={s.name} display='flex' fontSize='sm' mb='2'>
          <Text fontWeight='bold' mr='1'>
            {i + 1}.
          </Text>

          <Text>
            {s.name} - {s.info}
          </Text>
        </ListItem>
      );
    });
  };

  return (
    <>
      <Icon
        onClick={onOpen}
        icon={<InfoOutlineIcon />}
        variant='unstyled'
        cursor='pointer'
        ml='2'
        mt='0.5'
        aria-label='Strategies Info'
      />

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        motionPreset='none'
        scrollBehavior={'inside'}
      >
        <ModalOverlay />
        <MotionModalContent
          variants={modalVariants}
          initial='hidden'
          animate='visible'
          alignSelf='center'
          mx='2'
        >
          <ModalHeader alignSelf='center'>Strategies Info</ModalHeader>
          <ModalCloseButton _focus={{ outline: 'none' }} />
          <ModalBody>
            The strategies below are listed from most to least effective.
            Additionally, the more you use a strategy, the less effective it
            becomes.
            <Divider my='8' />
            <List>{renderInfoList()}</List>
          </ModalBody>
        </MotionModalContent>
      </Modal>
    </>
  );
}
