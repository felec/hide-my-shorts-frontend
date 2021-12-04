import { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Text,
  Button,
  Progress,
  Tag,
  TagLabel,
  Center,
  Divider,
  SimpleGrid,
} from '@chakra-ui/react';
import firebase from 'firebase/app';
import NumberFormat from 'react-number-format';
import { useDocument } from 'react-firebase-hooks/firestore';

import { db } from '../firebase';
import { initialPosition } from '../App';
import { roundDec } from '../utils/stat';
import { Position, Strategy } from '../types/types';
import { HeaderRow } from '../components/HeaderRow';
import { ChartColumn } from '../components/ChartColumn';
import { ValueSlider } from '../components/ValueSlider';
import {
  ModalInfoIcon,
  StrategiesModalInfoIcon,
} from '../components/ModalIconButton';
import { useAuth } from '../contexts/AuthContext';
import { useError } from '../contexts/ErrorContext';
import { NotifBanner } from '../components/NotifBanner';
import { StrategyMenu } from '../components/StrategyMenu';
import { usePosition } from '../contexts/PositionContext';
import { validatePosition } from '../middleware/validate-position';

export function Dashboard() {
  const { currentUser } = useAuth();
  const { setError } = useError();
  const { position, setPosition } = usePosition();
  // eslint-disable-next-line
  const [snapshot, _, err] = useDocument(
    firebase.firestore().doc(`positions/${currentUser?.uid}`),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  const [isLoading, setIsLoading] = useState(false);
  const [newPosition, setNewPosition] = useState<Position>(position);
  const [newNakeds, setNewNakeds] = useState(0);
  const [borrowAvailable, setBorrowAvailable] = useState(0);
  const [nakedAvailable, setNakedAvailable] = useState(0);
  const canNaked = position.current_week + 1 - position.last_naked > 1;
  const currentPos = position.short_position * position.price;
  const nakedCost = newNakeds * newPosition?.price + (newNakeds / 100) * 5;

  const calculateShortCost = (pos: Position) => {
    const borr = pos.short_position;
    const prevBorr = pos.prev_short_position;
    const newBorr = prevBorr === 0 ? borr : borr - prevBorr;
    const newVal = newBorr * pos.price;
    const totalBorr = pos.borrow_value + newVal;
    const valuePrice = totalBorr / borr;
    const shortCost = ((pos.borrow_fee * (borr * valuePrice)) / 360) * 7;

    const cost = isNaN(shortCost) ? 0 : shortCost;

    return cost;
  };

  const handleSharesAvailable = (pos: Position) => {
    const min = 0.15;
    const max = 0.2;

    const random = Math.random() * (max - min) + min;

    const truncate = random.toFixed(2);

    const percent = parseFloat(truncate);

    const available = percent * pos.float;

    return available;
  };

  const handleShortChange = (v: number) => {
    const pos = {
      ...newPosition,
      short_position: v,
    };

    setNewPosition(pos);
  };

  const handleNakedChange = (v: number) => {
    const pos = {
      ...newPosition,
      naked_short_position: v,
    };

    setNewPosition(pos);

    setNewNakeds(v - position.naked_short_position);
  };

  const handleStrategies = (strategies: Strategy[]) => {
    const pos = {
      ...newPosition,
      ...strategies,
    };

    setNewPosition(pos);
  };

  const shortCost = calculateShortCost(newPosition);

  const handleCashAvailable = (pos: Position) => {
    let cash = pos.cash;

    for (const s of pos.strategies) {
      if (s.is_used) {
        cash = cash - s.cost;
      }
    }

    cash = cash - nakedCost - shortCost;

    return cash.toFixed(2);
  };

  const handleSubmitPosition = async () => {
    setIsLoading(true);

    try {
      const pos = validatePosition(position, newPosition);

      if (position.days_to_ftd === 0 && !position.strategies[4].is_used) {
        setError(`You have run out of FTD days!`);
      } else if (
        (position.current_week + 1) % 4 === 0 &&
        !position.strategies[2].is_used
      ) {
        setError(`Your reported interest will be visible to the public!`);
      }

      await db.collection('positions').doc(currentUser?.uid).update(pos);

      setIsLoading(false);
    } catch (err: any) {
      setIsLoading(false);
      setError(err.message);
    }
  };

  useEffect(() => {
    setNewPosition(position);

    if (!position.is_set) {
      setBorrowAvailable(handleSharesAvailable(position));
    } else {
      setBorrowAvailable(0);
    }

    if (canNaked && !position.is_set) {
      setNakedAvailable(position.float * 0.1);
      setNewNakeds(0);
    } else {
      setNakedAvailable(0);
      setNewNakeds(0);
    }

    // eslint-disable-next-line
  }, [position]);

  useEffect(() => {
    if (snapshot?.data() && !err) {
      const data = snapshot?.data();

      try {
        const pos: Position = {
          name: data?.name,
          borrow_fee: data?.borrow_fee,
          borrow_value: data?.borrow_value,
          cash: data?.cash,
          current_week: data?.current_week,
          days_to_ftd: data?.days_to_ftd,
          float: data?.float,
          ftd_shares: data?.ftd_shares,
          gamma: data?.gamma,
          last_naked: data?.last_naked,
          last_reduce: data?.last_reduce,
          investor_rank: data?.investor_rank,
          investor_suspicion: data?.investor_suspicion,
          is_call: data?.is_call,
          is_fail: data?.is_fail,
          is_set: data?.is_set,
          naked_short_position: data?.naked_short_position,
          naked_value: data?.naked_value,
          news: data?.news,
          prev_borrow_fee: data?.prev_borrow_fee,
          prev_borrow_value: data?.prev_borrow_value,
          prev_cash: data?.prev_cash,
          prev_investor_rank: data?.prev_investor_rank,
          prev_investor_suspicion: data?.prev_investor_suspicion,
          prev_naked_short_position: data?.prev_naked_short_position,
          prev_naked_value: data?.prev_naked_value,
          prev_price: data?.prev_price,
          prev_price_support: data?.prev_price_support,
          prev_reported_position: data?.prev_reported_position,
          prev_short_position: data?.prev_short_position,
          price: data?.price,
          price_support: data?.price_support,
          reported_position: data?.reported_position,
          short_position: data?.short_position,
          strategies: data?.strategies,
          streak: data?.streak,
          symbol: data?.symbol,
        };

        setPosition(pos);
      } catch (err) {
        setError('Something went wrong');
        setPosition(initialPosition);
      }
    }
    // eslint-disable-next-line
  }, [snapshot]);

  const cash = handleCashAvailable(newPosition);

  return (
    <Box
      backgroundImage='url(../assets/fw-bg.svg)'
      backgroundRepeat='no-repeat'
      backgroundSize='cover'
      width={['100%', '100%', '100%', '100vw', '100%']}
      height={['100%', '100%', '100%', '100vh', '100%']}
    >
      <HeaderRow />

      <NotifBanner position={position} />

      <Flex mt='8' flexDirection='column'>
        <SimpleGrid width='100%' columns={[1, 1, 1, 3]}>
          <SimpleGrid width='100%' columns={[1, 2, 2, 1]} alignItems='center'>
            <Flex
              mb={[0, 24, 24, 0]}
              width='100%'
              flexDirection='column'
              alignItems='center'
            >
              <Divider my='4' width='60' />
              <Flex>
                <Text>Margin Requirement</Text>
                <ModalInfoIcon
                  title={'Margin Requirement'}
                  content={`To keep a short position open,
                            the value of your current position plus 30%
                            of your position in cash is required at all times,
                            otherwise you will be margin called.`}
                />
              </Flex>
              <Divider my='4' width='60' />
              <NumberFormat
                value={roundDec(currentPos * 1.3)}
                prefix={'$'}
                displayType={'text'}
                decimalScale={2}
                thousandSeparator={true}
                fixedDecimalScale={true}
                style={{ fontWeight: 'bold' }}
              />
            </Flex>

            <Center flexDirection='column' my='8'>
              <Divider my='4' width='60' />
              <Text>Cash Available</Text>
              <Divider my='4' width='60' />
              <NumberFormat
                value={cash}
                prefix={'$'}
                displayType={'text'}
                decimalScale={2}
                thousandSeparator={true}
                fixedDecimalScale={true}
                style={{ fontWeight: 'bold' }}
              />

              {
                <Tag
                  display='flex'
                  justifyContent='center'
                  width='16rem'
                  px='8'
                  mt='8'
                  variant='subtle'
                  colorScheme={'red'}
                >
                  <TagLabel>
                    <NumberFormat
                      value={shortCost}
                      prefix={'$'}
                      decimalScale={2}
                      suffix={' / week'}
                      displayType={'text'}
                      thousandSeparator={true}
                      fixedDecimalScale={true}
                    />
                  </TagLabel>
                </Tag>
              }

              <Tag
                display='flex'
                justifyContent='center'
                width='16rem'
                px='8'
                mt='2'
                variant='subtle'
                colorScheme={'red'}
              >
                <TagLabel>
                  <NumberFormat
                    value={nakedCost.toFixed(2)}
                    prefix={'$'}
                    decimalScale={2}
                    suffix={' premium'}
                    displayType={'text'}
                    thousandSeparator={true}
                    fixedDecimalScale={true}
                  />
                </TagLabel>
              </Tag>
            </Center>
          </SimpleGrid>

          {newPosition && <ChartColumn />}

          <SimpleGrid alignItems='center' width='100%' columns={[1, 2, 2, 1]}>
            <Flex mb={[0, 4, 4, 0]} flexDirection='column' alignItems='center'>
              <Divider my='4' width='60' />
              <Flex>
                <Text>Investor Suspicion Level</Text>
                <ModalInfoIcon
                  title={'Investor Suspicion'}
                  content={`Investors are constantly monitering the stock and researching
                            new price movement. The more you utilize strategies and naked shorting,
                            the more suspicious investors become, and consequently, the more they
                            buy and hold.`}
                />
              </Flex>
              <Divider my='4' width='60' />
              <Box width='40%'>
                <Progress
                  borderRadius='4'
                  value={position.investor_suspicion * 100}
                />
              </Box>
            </Flex>

            <Center my='8' flexDirection='column'>
              <Divider my='4' width='60' />

              <Flex>
                <Text>Week {newPosition.current_week + 1} Strategies</Text>
                <StrategiesModalInfoIcon strategies={newPosition.strategies} />
              </Flex>
              <Divider my='4' width='60' />

              <StrategyMenu cb={handleStrategies} position={newPosition} />
            </Center>
          </SimpleGrid>
        </SimpleGrid>

        <Center
          my={['0', '0', '0', '8']}
          px={['4', '4', '4', '16']}
          width='100%'
          flexDirection={['column', 'row']}
          justifyContent='space-evenly'
        >
          <Flex
            mt='8'
            alignItems='center'
            flexDirection='column'
            width={['100%', '50%', '50%', '30%']}
          >
            <Divider my='4' width='60' />
            <Flex>
              <Text>Short Position</Text>
              <ModalInfoIcon
                title={'Adjust Short Position'}
                content={`The percentage shown is your short position relative to the float.
                          There is a finite number of borrowed shares available to short each week.
                          Adjust the number of shares you want to short in the market.
                          And remember, borrowed shares carry a weekly cost.`}
              />
            </Flex>
            <Divider my='4' width='60' />

            <ValueSlider
              cb={(v) => handleShortChange(v)}
              max={position?.short_position + borrowAvailable}
              min={position?.short_position}
              percent={newPosition.short_position / newPosition.float}
              step={position.float * 0.01}
              value={newPosition.short_position}
            />
          </Flex>

          <Flex
            mt='8'
            alignItems='center'
            flexDirection='column'
            width={['100%', '50%', '50%', '30%']}
          >
            <Divider my='4' width='60' />
            <Flex>
              <Text>Naked Short Position</Text>
              <ModalInfoIcon
                title={'Adjust Naked Short Position'}
                content={`The percentage shown is your naked short position relative to the float.
                          There is a finite number of naked shares available to short each week.
                          Adjust the number of shares you want to short in the market.
                          And remember, naked shares carry a premium cost.
                          Once this strategy is used, it will be unavailable for 1 week.`}
              />
            </Flex>
            <Divider my='4' width='60' />

            <ValueSlider
              cb={(v) => handleNakedChange(v)}
              max={position?.naked_short_position + nakedAvailable}
              min={position?.naked_short_position}
              percent={newPosition.naked_short_position / newPosition.float}
              step={position.float * 0.01}
              value={newPosition.naked_short_position}
            />
          </Flex>
        </Center>

        <Button
          onClick={handleSubmitPosition}
          my={['24', '16']}
          maxW='min-content'
          alignSelf='center'
          isLoading={isLoading}
          isDisabled={position.is_set}
          bgGradient='linear(to-l, teal.500,blue.500)'
          _focus={{ outline: 'none' }}
          _hover={{
            bgGradient: 'linear(to-l, teal.600, blue.600)',
          }}
        >
          Submit Position
        </Button>
      </Flex>
    </Box>
  );
}
