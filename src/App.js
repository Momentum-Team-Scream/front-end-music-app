import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import useLocalStorageState from 'use-local-storage-state';
import { useState, useEffect } from 'react';
import { RegisterInstructor } from './components/RegisterInstr';
import { Login } from './components/Login';
<<<<<<< HEAD
import { Navbar } from './components/Navbar.js';
import { LessonList } from './components/LessonList.js';
import { LessonDetail } from './components/LessonDetail.js';

=======
import { Navigation } from './components/Navigation.js';
import { StudentList } from './components/StudentList.js';

// import { AssignmentForm } from './components/AssignmentForm.js';
>>>>>>> 2d849d08843cfe2e018c75712977da6dc3382b06

export const App = () => {
  const [auth, setAuth, { removeItem }] = useLocalStorageState('auth', '');

<<<<<<< HEAD
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
=======
  return (
    <>
      <Router>
        <Navigation auth={auth} setAuth={setAuth} clearStorage={removeItem} />
>>>>>>> 2d849d08843cfe2e018c75712977da6dc3382b06

  return (
    <Router>
      <div className="App">
        <Navbar auth={auth} setAuth={setAuth } clearStorage={removeItem} />
        <Switch>
          <Route exact path="/" render={() => auth 
            ? <Redirect to={{ pathname: '/upcoming' }}/> 
              : <Redirect to={{ pathname: '/login' }}/> }
          />
<<<<<<< HEAD
          <Route path="/login" component={() => <Login auth={auth} setAuth={setAuth} />}/>
          <Route path="/register" component={() => <RegisterInstructor setAuth={setAuth} />}/>
          <Route path="/upcoming" component={() => <LessonList auth={auth} />}/>
          <Route path="/lessons/:pk" component={(pk) => <LessonDetail props={pk} auth={auth} />}/>
          
=======
          <Route
            path="/students"
            component={() => <StudentList auth={auth} setAuth={setAuth} />}
          />
>>>>>>> 2d849d08843cfe2e018c75712977da6dc3382b06
        </Switch>
      </div>
    </Router>
  )
};
