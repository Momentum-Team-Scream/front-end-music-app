import React from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import useLocalStorageState from 'use-local-storage-state';
import { useState, useEffect } from 'react';
import { RegisterInstructor } from './components/RegisterInstr';
import { Login } from './components/Login';
import { LessonList } from './components/LessonList.js';
import { LessonDetail } from './components/LessonDetail.js';
import { Navigation } from './components/Navigation.js';
import { StudentList } from './components/StudentList.js';
import { InstrProfile } from './components/InstrProfile.js';

// import { AssignmentForm } from './components/AssignmentForm.js';

export const App = () => {
  const [auth, setAuth, { removeItem }] = useLocalStorageState('auth', '');

  // const [auth, setAuth, { removeItem }] = useLocalStorageState('token', '');
  // const [username, setUsername] = useState('');
  // const [user, setUser] = useLocalStorageState('user', {});

  // useEffect(() => {
  //   console.log(auth);
  //   if (auth) {
  //     axios
  //       .get('https://music-mvp.herokuapp.com/api/auth/users/me', {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `token ${auth}`,
  //         },
  //       })
  //       .then((response) => {
  //         setUser(response.data);
  //         setUsername(response.data[0].username);
  //       });
  //     console.log(user);
  //   }
  // }, [auth],);

  return (
    <Router>
      <div className="App">
        <Navigation auth={auth} setAuth={setAuth} clearStorage={removeItem} />
        <div className="appBody">
          <Switch>
            <Route
              exact
              path="/"
              render={() =>
                auth ? (
                  <Redirect to={{ pathname: '/home' }} />
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
            <Route path="/home" component={() => <LessonList auth={auth} />} />
            <Route
              path="/lessons/:pk"
              component={(pk) => <LessonDetail props={pk} auth={auth} />}
            />
            <Route
              path="/students"
              component={() => <StudentList auth={auth} setAuth={setAuth} />}
            />
            <Route
              path="/profile"
              component={() => <InstrProfile auth={auth} setAuth={setAuth} />}
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
};
