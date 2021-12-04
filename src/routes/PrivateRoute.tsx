import { createElement } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const PrivateRoute = ({ component, ...rest }: any) => {
  const { currentUser } = useAuth();

  const renderComponent = (props: any) => {
    return currentUser ? createElement(component, props) : <Redirect to='/' />;
  };

  return <Route {...rest} render={renderComponent}></Route>;
};

// export const ValidatedUserRoute = ({ component, ...rest }: any) => {
//   const { currentUser } = useAuth();

//   const renderComponent = (props: any) => {
//     return currentUser ? (
//       <Redirect to='/dashboard' />
//     ) : (
//       createElement(component, props)
//     );
//   };

//   return <Route {...rest} render={renderComponent}></Route>;
// };
