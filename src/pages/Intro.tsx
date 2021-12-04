import {
  Box,
  Button,
  Flex,
  Text,
  Center,
  Heading,
  CenterProps,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useHistory } from 'react-router-dom';

import { ModalStoryButton } from '../components/ModalButton';

const MotionCenter = motion<CenterProps>(Center);

export function Intro() {
  const history = useHistory();

  const navigateToSignUp = () => history.push('/sign-up');

  const headVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        delay: 3,
        duration: 1,
        ease: 'easeInOut',
      },
    },
  };

  const pathVariants = {
    hidden: {
      pathLength: 0,
    },
    visible: {
      pathLength: 1,
      transition: {
        duration: 3,
        ease: 'easeInOut',
      },
    },
  };

  const glowVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        delay: 3,
        duration: 1,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <Box
      backgroundImage='url(../assets/fw-bg.svg)'
      backgroundRepeat='no-repeat'
      backgroundSize='cover'
      width='100vw'
      height='100vh'
    >
      <MotionCenter
        variants={headVariants}
        initial='hidden'
        animate='visible'
        flexDirection='column'
        mb='8'
      >
        <Heading
          as='h1'
          mt='8'
          bgClip='text'
          fontSize={['x-large', 'xx-large']}
          bgGradient='linear(to-l, teal.500,blue.500)'
        >
          Hide My Shorts
        </Heading>

        <Text color='gray.200' fontSize={['small', 'large']} fontWeight='bold'>
          Based on a true story
        </Text>

        <Flex mt='8'>
          <Button
            onClick={navigateToSignUp}
            mr='2'
            colorScheme='blue'
            variant='solid'
            fontSize={['sm', 'md']}
          >
            Let's Play!
          </Button>

          <ModalStoryButton />
        </Flex>
      </MotionCenter>

      <Box>
        <svg
          width='100%'
          height='100%'
          version='1.1'
          viewBox='0 0 575.41 161.15'
          xmlns='http://www.w3.org/2000/svg'
        >
          <defs>
            <filter
              id='filter1240'
              x='-.0061021'
              y='-.022494'
              width='1.0122'
              height='1.045'
              colorInterpolationFilters='sRGB'
            >
              <feGaussianBlur stdDeviation='1.445381' />
            </filter>
          </defs>
          <g transform='translate(9.5522 -60.69)'>
            <motion.path
              variants={pathVariants}
              initial='hidden'
              animate='visible'
              d='m-6.0833 218.37c12.851-6.8036 12.095-6.8036 12.095-6.8036l6.0476 3.0238 8.3155-3.0238h6.0476l6.0476-5.2917 3.0238-7.5595 14.363-99.786 1.5119 55.94 6.8036-46.869 4.5357 83.155 6.0476-5.2917 6.8036 17.387 7.5595-7.5595 12.095 8.3155 22.679-6.0476 11.339 3.7798 5.2917-18.899 7.5595-6.0476 5.2917 7.5595 6.8036-11.339 6.0476 3.0238 14.363-12.095 6.0476-40.821 8.3155 3.7798 7.5595-3.7798 3.7798 19.655 3.0238 2.2679 10.583 6.8036 5.2917 17.387 3.7798 25.702 3.0238-33.262 11.339 6.0476 5.2917-9.8274 10.583 5.2917 7.5595 11.339 2.2679 17.387h9.8274l3.7798-18.899 4.5357 9.0714 4.5357-5.2917 4.5357 10.583h8.3155l3.0238-18.143 8.3155 7.5595 4.5357-13.607 6.8036-0.75595 3.0238 10.583 13.607-7.5595 9.0714-68.792 6.8036 25.702 5.2917-42.333 6.0476 27.214 4.5357-39.31 7.5595-3.7798 0.75595 96.762 6.8036-20.411 6.8036 15.875 7.5595-7.5595 3.7798 20.411 6.8036-19.655 6.0476 3.0238 1.5119 12.095 6.0476-6.8036 3.7798 6.0476 6.0476-6.0476 3.7798 12.095 8.3155 7.5595 10.583-6.0476 7.5595 14.363 5.2917 18.143 7.5595-39.31 6.0476 16.631 6.8036-11.339 8.3155 10.583 3.7798 14.363 6.8036 9.0714 6.8036-10.583 3.0238 5.2917 4.5357-9.0714 6.0476 9.0714 9.0714-9.0714 6.0476 7.5595v3.7798l3.7798 3.0238 4.5357-16.631 6.8036-77.107 3.7798 12.095'
              fill='none'
              strokeWidth='1'
              stroke='#7abffe'
            />
            <motion.path
              variants={glowVariants}
              initial='hidden'
              animate='visible'
              d='m-6.0833 218.37c12.851-6.8036 12.095-6.8036 12.095-6.8036l6.0476 3.0238 8.3155-3.0238h6.0476l6.0476-5.2917 3.0238-7.5595 14.363-99.786 1.5119 55.94 6.8036-46.869 4.5357 83.155 6.0476-5.2917 6.8036 17.387 7.5595-7.5595 12.095 8.3155 22.679-6.0476 11.339 3.7798 5.2917-18.899 7.5595-6.0476 5.2917 7.5595 6.8036-11.339 6.0476 3.0238 14.363-12.095 6.0476-40.821 8.3155 3.7798 7.5595-3.7798 3.7798 19.655 3.0238 2.2679 10.583 6.8036 5.2917 17.387 3.7798 25.702 3.0238-33.262 11.339 6.0476 5.2917-9.8274 10.583 5.2917 7.5595 11.339 2.2679 17.387h9.8274l3.7798-18.899 4.5357 9.0714 4.5357-5.2917 4.5357 10.583h8.3155l3.0238-18.143 8.3155 7.5595 4.5357-13.607 6.8036-0.75595 3.0238 10.583 13.607-7.5595 9.0714-68.792 6.8036 25.702 5.2917-42.333 6.0476 27.214 4.5357-39.31 7.5595-3.7798 0.75595 96.762 6.8036-20.411 6.8036 15.875 7.5595-7.5595 3.7798 20.411 6.8036-19.655 6.0476 3.0238 1.5119 12.095 6.0476-6.8036 3.7798 6.0476 6.0476-6.0476 3.7798 12.095 8.3155 7.5595 10.583-6.0476 7.5595 14.363 5.2917 18.143 7.5595-39.31 6.0476 16.631 6.8036-11.339 8.3155 10.583 3.7798 14.363 6.8036 9.0714 6.8036-10.583 3.0238 5.2917 4.5357-9.0714 6.0476 9.0714 9.0714-9.0714 6.0476 7.5595v3.7798l3.7798 3.0238 4.5357-16.631 6.8036-77.107 3.7798 12.095'
              fill='none'
              opacity='.6'
              strokeWidth='1'
              stroke='#7abffe'
              filter='url(#filter1240)'
            />
          </g>
        </svg>
      </Box>
    </Box>
  );
}
