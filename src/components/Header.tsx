import { Box, Flex, Text, FlexProps } from '@chakra-ui/react';
import { motion } from 'framer-motion';

import { isBetween, randNumber } from '../utils/stat';

const MotionFlex = motion<FlexProps>(Flex);

const calcX = (i: number) => {
  let x = 0;

  if (i <= 3) {
    x = -35;
  } else if (isBetween(i, 3, 5)) {
    x = -55;
  } else if (isBetween(i, 5, 8)) {
    x = -85;
  } else if (i > 8) {
    x = -105;
  }

  return x;
};

const transX = (i: number) => {
  let t: number[] = [];

  if (i <= 3) {
    t = [-35, -30, -20, -10, -5, -3, 0];
  } else if (isBetween(i, 3, 5)) {
    t = [-55, -50, -45, -30, -20, -10, 0];
  } else if (isBetween(i, 5, 8)) {
    t = [-85, -75, -60, -50, -40, -30, -10, 0];
  } else if (i > 8) {
    t = [-105, -95, -80, -70, -60, -20, -10, 0];
  }

  return t;
};

const transY = (i: number) => {
  let t: number[] = [];

  if (i <= 3) {
    t = [-10, -30, -60, -30, -10, 0];
  } else if (isBetween(i, 3, 5)) {
    t = [-10, -40, -70, -40, -10, 0];
  } else if (isBetween(i, 5, 8)) {
    t = [-10, -50, -80, -50, -10, 0];
  } else if (i > 8) {
    t = [-10, -60, -90, -60, -10, 0];
  }

  return t;
};

const titleVariants = {
  hidden: (i: number) => ({
    translateX: calcX(i),
    translateY: -5,
    rotateZ: -360 * randNumber(4, 8),
  }),
  hover: (i: number) => ({
    translateX: transX(i),
    translateY: transY(i),
    rotateZ: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.05,
    },
  }),
};

export const Header = ({ cb }: { cb: () => void }) => {
  const spanTitle = (title: string) => {
    const titleList = title.split('');

    const letters = titleList.map((l, i) => {
      return (
        <motion.span
          key={`${l}${i}`}
          variants={titleVariants}
          custom={i}
          style={{
            color: '#319795',
            fontSize: '1rem',
            fontWeight: 'bold',
            marginTop: '4px',
          }}
        >
          {l}
        </motion.span>
      );
    });

    return letters;
  };

  return (
    <MotionFlex
      onClick={cb}
      initial='hidden'
      whileHover='hover'
      cursor='pointer'
      alignItems='center'
    >
      <Box
        mr='1'
        px='3'
        pb={[1, 0]}
        border='1px'
        borderColor='#3F444E'
        borderRadius='md'
        backgroundColor='#1A202C'
        zIndex='100'
      >
        <Text
          fontSize={['md', 'xl', '2xl']}
          fontWeight='bold'
          bgClip='text'
          bgGradient='linear(to-l, teal.500,blue.500)'
        >
          H
        </Text>
      </Box>

      {spanTitle('ide My Shorts')}
    </MotionFlex>
  );
};
