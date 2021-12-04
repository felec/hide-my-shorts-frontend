import {
  Button,
  Menu,
  MenuList,
  MenuButton,
  MenuItemOption,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

import { formatNum } from '../utils/stat';
import { Position, Strategy } from '../types/types';

export function StrategyMenu({
  cb,
  position,
}: {
  cb: (strategies: Strategy[]) => void;
  position: Position;
}) {
  let newStrategies = position.strategies;

  const handleSelection = (strategy: Strategy, index: number) => {
    newStrategies[index].is_used = !strategy.is_used;
    cb(newStrategies);
  };

  const handleDisableStrategy = (s: Strategy) => {
    const week = position.current_week + 1;
    const canReduce = week - position.last_reduce > 3;
    let d = false;

    if (s.name === 'Reduce Investor Suspicion' && !canReduce) {
      d = true;
    } else if (s.name === 'Disable Buy Button' && s.times_used !== 0) {
      d = true;
    } else if (s.name === 'Delay Margin Call' && s.times_used !== 0) {
      d = true;
    }

    return d;
  };

  const renderMenuItems = (sList: Strategy[]) => {
    return sList.map((s, i) => {
      return (
        <MenuItemOption
          key={s.name}
          value={s.name}
          fontSize='sm'
          isChecked={s.is_used}
          isDisabled={handleDisableStrategy(s)}
          onClick={() => handleSelection(s, i)}
        >
          {s.name} - ${formatNum(s.cost)}
        </MenuItemOption>
      );
    });
  };

  return (
    <Menu closeOnSelect={false}>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon />}
        _focus={{ outline: 'none' }}
      >
        Select Strategies
      </MenuButton>
      <MenuList zIndex='100' minWidth='240px'>
        {renderMenuItems(newStrategies)}
      </MenuList>
    </Menu>
  );
}
