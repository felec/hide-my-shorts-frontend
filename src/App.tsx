import { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import { Box, ChakraProvider } from '@chakra-ui/react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import theme from './theme';
import { auth } from './firebase';
import { Position } from './types/types';
import { Intro } from './pages/Intro';
import { SignUp } from './pages/SignUp';
import { SignIn } from './pages/SignIn';
import { EditUser } from './pages/EditUser';
import { Dashboard } from './pages/Dashboard';
import { PrivateRoute } from './routes/PrivateRoute';
import { AuthContext } from './contexts/AuthContext';
import { ErrorContext } from './contexts/ErrorContext';
import { PositionContext } from './contexts/PositionContext';

export const initialPosition: Position = {
  borrow_fee: 0,
  borrow_value: 0,
  cash: 0,
  current_week: 1,
  days_to_ftd: 35,
  float: 1,
  ftd_shares: 0,
  gamma: 1000,
  last_naked: 0,
  last_reduce: 0,
  investor_rank: 'buy',
  investor_suspicion: 0,
  is_call: false,
  is_fail: false,
  is_set: false,
  naked_short_position: 0,
  naked_value: 0,
  name: '---',
  news: 0,
  prev_cash: 0,
  prev_investor_rank: 'buy',
  prev_investor_suspicion: 0,
  prev_borrow_fee: 0,
  prev_borrow_value: 0,
  prev_naked_short_position: 1,
  prev_naked_value: 0,
  prev_price: 1,
  prev_price_support: 0,
  prev_reported_position: 0,
  prev_short_position: 1,
  price: 1,
  price_support: 0,
  reported_position: 0,
  short_position: 0,
  strategies: [],
  streak: 0,
  symbol: 'abc',
};

const helmetContext = {};

export const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [position, setPosition] = useState<Position>(initialPosition);
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <>
      <HelmetProvider context={helmetContext}>
        <Helmet>
          <meta charSet='utf-8' />
          <title>Hide My Shorts</title>
          <link rel='icon' href='../shorts.ico' />
        </Helmet>

        <ChakraProvider theme={theme}>
          <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
            <ErrorContext.Provider value={{ error, setError }}>
              <PositionContext.Provider value={{ position, setPosition }}>
                {isLoading ? (
                  <Box
                    backgroundImage='url(./assets/fw-bg.svg)'
                    backgroundRepeat='no-repeat'
                    backgroundSize='cover'
                    height='100vh'
                    width='100vw'
                  ></Box>
                ) : (
                  <Router>
                    <Switch>
                      <Route path='/' exact component={Intro} />
                      <PrivateRoute
                        path='/dashboard'
                        exact
                        component={Dashboard}
                      />
                      <Route path='/sign-up' exact component={SignUp} />
                      <Route path='/sign-in' exact component={SignIn} />
                      <PrivateRoute
                        path='/edit-user'
                        exact
                        component={EditUser}
                      />
                    </Switch>
                  </Router>
                )}
              </PositionContext.Provider>
            </ErrorContext.Provider>
          </AuthContext.Provider>
        </ChakraProvider>
      </HelmetProvider>
    </>
  );
};
