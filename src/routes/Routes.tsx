import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {useAppUser} from '../contexts/UserContext';
import ForgotPassword from '../screens/forgot-password/ForgotPassword';
import Home from '../screens/home/Home';
import SignIn from '../screens/signin/SignIn';
import SignUp from '../screens/signup/SignUp';

const Routes = () => {
  const user = useAppUser().fireUser;

  const auth = (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
    </Switch>
  );

  const unAuth = (
    <Switch>
      <Route path="/signin" component={SignIn} />

      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/signup" component={SignUp} />
      <Route path="/" component={SignIn} />
    </Switch>
  );

  return (
    <Router>
      {user === null ? unAuth : user !== undefined ? auth : <></>}
    </Router>
  );
};

export default Routes;
