import { Position } from '../types/types';

export const validatePosition = (oldPos: Position, newPos: Position) => {
  const cashLoss = Math.sign(oldPos.cash - newPos.cash);
  const prevBorr = newPos.prev_short_position;
  const prevNaked = newPos.prev_naked_short_position;
  const borr = newPos.short_position;
  const naked = newPos.naked_short_position;
  const newBorr = prevBorr === 0 ? borr : borr - prevBorr;
  const newNaked = prevNaked === 0 ? naked : naked - prevNaked;
  const shareLimit = oldPos.float * 0.2;
  const nakedLimit = oldPos.float * 0.1;

  const p = {
    is_set: true,
    naked_short_position: newPos.naked_short_position,
    short_position: newPos.short_position,
    strategies: newPos.strategies,
  };

  if (newBorr > shareLimit || newNaked > nakedLimit) {
    throw new Error('Position Invalid');
  }

  if (newPos.cash <= 1 || cashLoss === -1 || newPos.is_call) {
    throw new Error('Position Invalid');
  }

  if (oldPos.is_set || (oldPos.prev_price < 1 && oldPos.price < 1)) {
    throw new Error('Position Already Set');
  }

  return p;
};
