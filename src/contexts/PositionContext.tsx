import { createContext, useContext } from 'react';
import { Position } from '../types/types';

type PositionContextType = {
  position: Position;
  setPosition: (position: Position) => void;
};

export const PositionContext = createContext<PositionContextType>(null!);

export const usePosition = () => useContext(PositionContext);
