import React from 'react';
import {Route, Redirect} from 'react-router-dom';

const PrivateRoute = ({path, callback, ...rest}) => {
  const user = localStorage.getItem('user');
  const fullPath = window.location.pathname;
  if (user) {
    return <Route path={path} render={callback} {...rest} />
  } else {
    localStorage.setItem('continue', fullPath);
    return <Redirect to='/sign-in' />
  }
}

export default PrivateRoute;