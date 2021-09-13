import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {useAppUser} from '../contexts/UserContext';
import Home from '../screens/home/Home';
import SignIn from '../screens/signin/SignIn';

const Routes = () => {
  const {fireUser} = useAppUser();

  return (
    <Router>
      <Switch>
        <Route
          path="/"
          component={() => {
            return fireUser ? <Home /> : <SignIn />;
          }}
        />
      </Switch>
    </Router>
  );
};

export default Routes;
