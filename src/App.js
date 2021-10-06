import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import useLocalStorageState from 'use-local-storage-state';
import { RegisterInstructor } from './components/RegisterInstr';
import { Login } from './components/Login';
import { Navbar } from './components/Navbar.js';
import { AssignmentForm } from './components/AssignmentForm.js';

export const App = () => {
  const [auth, setAuth, { removeItem }] = useLocalStorageState('auth', '');

  return (
    <>
      <Router>
        <Navbar auth={auth} setAuth={setAuth} clearStorage={removeItem} />

        <Switch>
          <Route
            exact
            path="/"
            render={() =>
              auth ? (
                <div>Lessons go here</div>
              ) : (
                <Redirect to={{ pathname: '/login' }} />
              )
            }
          />
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
