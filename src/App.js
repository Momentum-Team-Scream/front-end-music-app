import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { RegisterInstructor } from './components/RegisterInstr';
import { Login } from './components/Login';
import { Navbar } from './components/Navbar.js';

export const App = () => {
  const [auth, setAuth] = useState('');

  return (
    <>
      <Router>
        <Navbar auth={auth} setAuth={setAuth} />

        <Switch>
          <Route
            path="/login"
            component={() => <Login auth={auth} setAuth={setAuth} />}
          />
          <Route
            path="/register"
            component={() => <RegisterInstructor setAuth={setAuth} />}
          />
        </Switch>
      </Router>
    </>
  );
};
