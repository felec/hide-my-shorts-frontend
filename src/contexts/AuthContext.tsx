import { createContext, useContext } from 'react';
import firebase from 'firebase/app';

type AuthContextType = {
  currentUser: firebase.User | null;
  setCurrentUser: (currentUser: firebase.User) => void;
};

export const AuthContext = createContext<AuthContextType>(null!);

export const useAuth = () => useContext(AuthContext);
