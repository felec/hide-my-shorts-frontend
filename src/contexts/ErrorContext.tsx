import { createContext, useContext } from 'react';

type AuthContextType = {
  error: string;
  setError: (error: string) => void;
};

export const ErrorContext = createContext<AuthContextType>(null!);

export const useError = () => useContext(ErrorContext);
