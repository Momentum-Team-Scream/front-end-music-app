import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import useLocalStorageState from 'use-local-storage-state';
import { useState, useEffect } from 'react';

import { RegisterInstructor } from './components/RegisterInstr';
import { Login } from './components/Login';
import { LessonList } from './components/LessonList.js';
import { LessonDetail } from './components/LessonDetail.js';


export const App = () => {
  const [auth, setAuth, { removeItem }] = useLocalStorageState('token', '');
  const [username, setUsername] = useState('');
  const [user, setUser] = useLocalStorageState('user', {});

  useEffect(() => {
    console.log(auth);
    if (auth) {
      axios
        .get('https://music-mvp.herokuapp.com/api/auth/users/me', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `token ${auth}`,
          },
        })
        .then((response) => {
          setUser(response.data);
          setUsername(response.data[0].username);
        });
      console.log(user);
    }
  }, [auth],);

  return (
    <Router>
      <div className="App">
        hii
        {/* <Header token={auth} setAuth={setAuth} clearStorage={removeItem} /> */}
        <Switch>
          <Route path="/login" component={() => <Login auth={auth} setAuth={setAuth} />}/>
          <Route path="/register" component={() => <RegisterInstructor setAuth={setAuth} />}/>
          <Route path="/upcoming" component={() => <LessonList token={auth} />}/>
          <Route path="/lesson/:pk" component={(pk) => <LessonDetail props={pk} token={auth} />}/>
          
        </Switch>
      </div>
    </Router>
  )
};
