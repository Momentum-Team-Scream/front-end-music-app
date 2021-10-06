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
import { Navigation } from './components/Navigation.js';
import { StudentList } from './components/StudentList.js';

// import { AssignmentForm } from './components/AssignmentForm.js';

export const App = () => {
  const [auth, setAuth, { removeItem }] = useLocalStorageState('auth', '');

  return (
    <>
      <Router>
        <Navigation auth={auth} setAuth={setAuth} clearStorage={removeItem} />

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
          <Route
            path="/students"
            component={() => <StudentList auth={auth} setAuth={setAuth} />}
          />
        </Switch>
      </Router>
    </>
  );
};
