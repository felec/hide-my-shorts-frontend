import { Box, Center } from '@chakra-ui/react';
import {
  Area,
  Tooltip,
  AreaChart,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

import { Day } from '../types/types';
import { formatNum, isBetween } from '../utils/stat';
import { ToolInfo } from './ToolInfo';

export const Chart = ({ data, color }: { data: Day[]; color: string }) => {
  const handleMax = (max: number) => {
    let add = 0;

    if (isBetween(max, 0, 10)) {
      add = 5;
    } else if (isBetween(max, 10, 50)) {
      add = 10;
    } else if (isBetween(max, 50, 150)) {
      add = 25;
    } else if (isBetween(max, 150, 300)) {
      add = 50;
    } else if (isBetween(max, 300, 500)) {
      add = 100;
    }

    const val = max + add;

    return val;
  };

  return (
    <Center position='relative' height='100%' width='100%'>
      <Box
        position='absolute'
        top='0'
        left='0'
        height={['97.3%', '97.3%', '97.7%', '97.2%', '97.7%']}
        width={['84.8%', '89.5%', '89%', '87.3%', '89%']}
        borderRadius='xl'
        borderBottomRadius='0'
        mt='1'
        ml='1'
        bgGradient='linear(to-b, #3A6877,#214253)'
      ></Box>

      <ResponsiveContainer height={'100%'} width={'100%'}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id='colorPv' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor={color} stopOpacity={0.4} />
              <stop offset='95%' stopColor={color} stopOpacity={0.2} />
            </linearGradient>
          </defs>
          <YAxis
            dataKey='close'
            width={40}
            fontSize='12px'
            orientation='right'
            axisLine={false}
            tickLine={false}
            type='number'
            tickFormatter={(num) => `${formatNum(num)}`}
            domain={['auto', (max: number) => handleMax(max)]}
          />
          <CartesianGrid opacity='.1' vertical={false} />
          <Tooltip content={<ToolInfo />} />
          <Area
            dataKey='close'
            stroke={color}
            fillOpacity={1}
            fill='url(#colorPv)'
          />
        </AreaChart>
      </ResponsiveContainer>
    </Center>
  );
};
