import { useEffect, useState, memo } from 'react';
import firebase from 'firebase/app';
import { ArrowRightIcon } from '@chakra-ui/icons';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Flex, Center, HStack, Button, useRadioGroup } from '@chakra-ui/react';

import { Chart } from './Chart';
import { Day } from '../types/types';
import { ChartButton } from './ChartButton';
import { handleQuery } from '../utils/chart-query';
import { useAuth } from '../contexts/AuthContext';
import { useError } from '../contexts/ErrorContext';
import { usePosition } from '../contexts/PositionContext';

export const StockChart = () => {
  const { currentUser } = useAuth();
  const { setError } = useError();
  const { position } = usePosition();
  const [isLoading, setIsLoading] = useState(false);
  const [queryType, setQueryType] = useState<string>('1W');
  const query = handleQuery(currentUser!.uid, position.symbol, queryType);
  const [snapshot, loading, err] = useCollectionData(query);
  const [chartData, setChartData] = useState<Day[]>([]);
  // Chart radio buttons functionality
  const handleRadioChange = (v: string) => (!loading ? setQueryType(v) : null);
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'stock',
    defaultValue: '1W',
    onChange: handleRadioChange,
  });
  const chartOptions = ['1W', '1M', '3M', 'Max'];
  // Chart data functionality
  const isIncrease = chartData
    ? chartData[0]?.close <= chartData[chartData?.length - 1]?.close
    : false;
  const color = isIncrease ? '#6cc165' : '#C53030';

  const handleSimulateWeek = async () => {
    if (position.is_call || position.current_week >= 34) return;

    const sim = firebase.functions().httpsCallable('simulateWeek');
    setIsLoading(true);

    try {
      if (!isLoading) await sim({ uid: currentUser?.uid });
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (snapshot && !err) {
      let total: Day[] = [];

      try {
        const data =
          queryType === 'Max' || queryType === '1W'
            ? snapshot
            : snapshot.reverse();

        for (const d of data) {
          const week: Day[] = d.days;
          total.push(...week);
        }

        setChartData(total);
      } catch (e) {
        setError('Something went wrong');
        setChartData([]);
      }
    }
    // eslint-disable-next-line
  }, [snapshot]);

  return (
    <Center
      justifySelf='center'
      flexDirection='column'
      my={[16, 8, 8, 8, 0]}
      boxSize={['xs', 'md', 'md', 'sm', 'md']}
    >
      <Flex>
        <Button
          onClick={handleSimulateWeek}
          size='xs'
          isLoading={isLoading}
          isDisabled={!position.is_set}
          rightIcon={<ArrowRightIcon boxSize={2.5} />}
          colorScheme='blue'
          variant='outline'
          fontSize={['xs', 'sm']}
          _focus={{ outline: 'none' }}
        >
          Simulate Week
        </Button>
      </Flex>

      <Flex justifyContent='space-evenly' my='4'>
        <HStack {...getRootProps()}>
          {chartOptions.map((value) => {
            const radio = getRadioProps({ value });
            return (
              <ChartButton key={value} {...radio}>
                {value}
              </ChartButton>
            );
          })}
        </HStack>
      </Flex>

      <Chart data={chartData} color={color} />
    </Center>
  );
};

export const ChartColumn = memo(StockChart);
