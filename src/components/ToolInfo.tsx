import { format } from 'date-fns';
import { Box, Text } from '@chakra-ui/react';
import NumberFormat from 'react-number-format';

import { Day } from '../types/types';
import { formatNum, handleStat } from '../utils/stat';

export const ToolInfo = ({ active, payload, label }: any) => {
  if (!active || !payload) return null;

  const info: Day = payload[0].payload;

  const changeStat = handleStat(info.close, info.open);

  return (
    <Box
      display='flex'
      flexDirection='column'
      justifyContent='center'
      height='8rem'
      width='8rem'
      bgColor='gray.800'
      boxShadow='dark-lg'
      borderRadius='lg'
      opacity='.75'
      p='2'
    >
      <Text fontSize='xs'>
        {' '}
        <span>Date: </span> {format(Date.parse(info.date), 'MMM d')}
      </Text>
      <NumberFormat
        value={info.open}
        displayType={'text'}
        prefix={'Open: '}
        thousandSeparator={true}
        style={{ fontSize: '.75rem' }}
      />
      <NumberFormat
        value={info.high}
        displayType={'text'}
        prefix={'High: '}
        thousandSeparator={true}
        style={{ fontSize: '.75rem' }}
      />
      <NumberFormat
        value={info.low}
        displayType={'text'}
        prefix={'Low: '}
        thousandSeparator={true}
        style={{ fontSize: '.75rem' }}
      />
      <NumberFormat
        value={info.close}
        displayType={'text'}
        prefix={'Close: '}
        thousandSeparator={true}
        style={{ fontSize: '.75rem' }}
      />
      <Text fontSize='xs'>
        <span>Vol: </span>
        {formatNum(info.volume)}
      </Text>

      <Text fontSize='xs'>
        <span>Change: </span>
        {changeStat.stat}%
      </Text>
    </Box>
  );
};
