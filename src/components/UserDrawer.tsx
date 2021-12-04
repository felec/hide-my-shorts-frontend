import {
  Text,
  Stack,
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Stat,
  StatLabel,
  StatArrow,
  StatHelpText,
  useDisclosure,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import { HamburgerIcon } from '@chakra-ui/icons';

import { Position } from '../types/types';
import { handleStat, roundDec } from '../utils/stat';
import { usePosition } from '../contexts/PositionContext';

export function UserDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { position } = usePosition();
  const history = useHistory();
  const float = position.float;

  const truncateName = (name: string) => {
    let n = name;

    if (name.length > 7) {
      n = `${name.slice(0, 8)}...`;
    }

    return n;
  };

  const handleRankStat = (curr: string, prev: string) => {
    let isIncrease = false;

    switch (curr) {
      case 'buy':
        isIncrease = false;
        break;
      case 'hold':
        isIncrease = prev === 'buy' ? true : false;
        break;
      default:
        isIncrease = true;
        break;
    }

    return { isIncrease };
  };

  const handleNakedAvailability = (position: Position) => {
    const week = position.current_week + 1;
    const next = position.last_naked + 2;

    const availability = week >= next ? 'available' : `week ${next}`;

    return availability.toUpperCase();
  };

  const avgBorrStat = handleStat(
    position.borrow_value,
    position.prev_borrow_value
  );
  const avgNakedStat = handleStat(
    position.naked_value,
    position.prev_naked_value
  );
  const priceStat = handleStat(position.price, position.prev_price);
  const cashStat = handleStat(position.cash, position.prev_cash);
  const reportedStat = handleStat(
    position.reported_position,
    position.prev_reported_position
  );
  const rankStat = handleRankStat(
    position.investor_rank,
    position.prev_investor_rank
  );
  const susStat = handleStat(
    position.investor_suspicion,
    position.prev_investor_suspicion
  );
  const supportStat = handleStat(
    position.price_support,
    position.prev_price_support
  );
  const borrowStat = handleStat(position.borrow_fee, position.prev_borrow_fee);

  return (
    <>
      {
        <>
          <Button
            size='xs'
            mr={[2, 4]}
            rightIcon={<HamburgerIcon />}
            colorScheme='gray'
            onClick={onOpen}
            variant='solid'
            fontSize={['xs', 'sm']}
            _focus={{ outline: 'none' }}
          >
            {truncateName(position.name)}
          </Button>
          <Drawer isOpen={isOpen} onClose={onClose} placement='right' size='xs'>
            <DrawerOverlay />
            <DrawerContent justifyContent='center'>
              <DrawerCloseButton _focus={{ outline: 'none' }} />
              <DrawerHeader
                display='flex'
                justifyContent='center'
                borderBottomWidth='1px'
                fontSize={['sm', 'md']}
              >
                {position.name}
              </DrawerHeader>

              <DrawerBody>
                <Stack spacing='1rem'>
                  <Button
                    size='sm'
                    variant='solid'
                    onClick={() => {
                      history.push('/edit-user');
                    }}
                  >
                    Edit Hedge Fund
                  </Button>

                  <Stat>
                    <StatLabel>Current Week</StatLabel>
                    {position.current_week}
                  </Stat>

                  <Stat>
                    <StatLabel>Stock Price</StatLabel>
                    <NumberFormat
                      value={position.price}
                      prefix={'$'}
                      decimalScale={2}
                      displayType={'text'}
                      thousandSeparator={true}
                      fixedDecimalScale={true}
                      style={{ fontSize: '1.25rem', fontWeight: 'bold' }}
                    />{' '}
                    <StatHelpText>
                      <StatArrow
                        type={priceStat.isIncrease ? 'increase' : 'decrease'}
                      />
                      {priceStat.stat}%
                    </StatHelpText>
                  </Stat>

                  <Stat>
                    <StatLabel>Average Borrow Price</StatLabel>
                    <NumberFormat
                      value={roundDec(
                        position.borrow_value / position.short_position
                      )}
                      displayType={'text'}
                      thousandSeparator={true}
                      prefix={'$'}
                      style={{ fontSize: '1.25rem', fontWeight: 'bold' }}
                    />
                    <StatHelpText>
                      <StatArrow
                        type={avgBorrStat.isIncrease ? 'increase' : 'decrease'}
                      />
                      {avgBorrStat.stat}%
                    </StatHelpText>
                  </Stat>

                  <Stat>
                    <StatLabel>Average Naked Price</StatLabel>
                    <NumberFormat
                      value={roundDec(
                        position.naked_value / position.naked_short_position
                      )}
                      displayType={'text'}
                      thousandSeparator={true}
                      prefix={'$'}
                      style={{ fontSize: '1.25rem', fontWeight: 'bold' }}
                    />
                    <StatHelpText>
                      <StatArrow
                        type={avgNakedStat.isIncrease ? 'increase' : 'decrease'}
                      />
                      {avgNakedStat.stat}%
                    </StatHelpText>
                  </Stat>

                  <Stat>
                    <StatLabel>Borrow Fee</StatLabel>
                    <NumberFormat
                      value={position.borrow_fee * 100}
                      displayType={'text'}
                      thousandSeparator={true}
                      suffix={'%'}
                      style={{ fontSize: '1.25rem', fontWeight: 'bold' }}
                    />
                    <StatHelpText>
                      <StatArrow
                        type={borrowStat.isIncrease ? 'increase' : 'decrease'}
                      />
                      {borrowStat.stat}%
                    </StatHelpText>
                  </Stat>

                  <Stat>
                    <StatLabel>Cash</StatLabel>
                    <NumberFormat
                      value={position.cash}
                      prefix={'$'}
                      displayType={'text'}
                      decimalScale={2}
                      thousandSeparator={true}
                      fixedDecimalScale={true}
                      style={{ fontSize: '1.25rem', fontWeight: 'bold' }}
                    />
                    <StatHelpText>
                      <StatArrow
                        type={cashStat.isIncrease ? 'increase' : 'decrease'}
                      />
                      {cashStat.stat}%
                    </StatHelpText>
                  </Stat>

                  <Stat>
                    <StatLabel>Days Until FTD</StatLabel>
                    <NumberFormat
                      value={position.days_to_ftd}
                      displayType={'text'}
                      thousandSeparator={true}
                      style={{ fontSize: '1.25rem', fontWeight: 'bold' }}
                    />
                  </Stat>

                  <Stat>
                    <StatLabel>Float</StatLabel>
                    <NumberFormat
                      value={position.float}
                      displayType={'text'}
                      thousandSeparator={true}
                      style={{ fontSize: '1.25rem', fontWeight: 'bold' }}
                    />
                  </Stat>

                  <Stat>
                    <StatLabel>Gamma Squeeze Price</StatLabel>
                    <NumberFormat
                      value={position.gamma}
                      displayType={'text'}
                      thousandSeparator={true}
                      prefix={'$'}
                      style={{ fontSize: '1.25rem', fontWeight: 'bold' }}
                    />
                  </Stat>

                  <Stat>
                    <StatLabel>Investor Rank</StatLabel>
                    <Text fontSize='lg' fontWeight='bold'>
                      {position?.investor_rank.toUpperCase()}
                    </Text>
                    <StatHelpText>
                      <StatArrow
                        type={rankStat.isIncrease ? 'increase' : 'decrease'}
                      />
                      {position?.prev_investor_rank.toUpperCase()}
                    </StatHelpText>
                  </Stat>

                  <Stat>
                    <StatLabel>Investor Suspicion Level</StatLabel>
                    <NumberFormat
                      value={(position.investor_suspicion * 100).toFixed(2)}
                      displayType={'text'}
                      suffix={'%'}
                      style={{ fontSize: '1.25rem', fontWeight: 'bold' }}
                    />{' '}
                    <StatHelpText>
                      <StatArrow
                        type={susStat.isIncrease ? 'increase' : 'decrease'}
                      />
                      {susStat.stat}%
                    </StatHelpText>
                  </Stat>

                  {
                    <Stat>
                      <StatLabel>Naked Short Availability</StatLabel>
                      <Text fontSize='lg' fontWeight='bold'>
                        {handleNakedAvailability(position)}
                      </Text>
                    </Stat>
                  }

                  <Stat>
                    <StatLabel>Price Support</StatLabel>
                    <NumberFormat
                      value={position.price_support}
                      prefix={'$'}
                      decimalScale={2}
                      displayType={'text'}
                      thousandSeparator={true}
                      fixedDecimalScale={true}
                      style={{ fontSize: '1.25rem', fontWeight: 'bold' }}
                    />
                    <StatHelpText>
                      <StatArrow
                        type={supportStat.isIncrease ? 'increase' : 'decrease'}
                      />
                      {supportStat.stat}%
                    </StatHelpText>
                  </Stat>

                  <Stat>
                    <StatLabel>Reported Short Interest</StatLabel>
                    <NumberFormat
                      value={(
                        (position.reported_position / float) *
                        100
                      ).toFixed(2)}
                      displayType={'text'}
                      suffix={'%'}
                      style={{ fontSize: '1.25rem', fontWeight: 'bold' }}
                    />{' '}
                    <StatHelpText>
                      <StatArrow
                        type={reportedStat.isIncrease ? 'increase' : 'decrease'}
                      />
                      {reportedStat.stat}%
                    </StatHelpText>
                  </Stat>
                </Stack>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </>
      }
    </>
  );
}
