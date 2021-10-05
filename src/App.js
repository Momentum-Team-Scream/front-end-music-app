import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { RegisterInstructor } from './components/RegisterInstr';
import { Login } from './components/Login';

export const App = () => {
  const [auth, setAuth] = useState('')

  return (
    <>
      <Router>
        <div>
          HIIIII
        </div>
        <Switch>
          <Route path="/login" component={() => <Login auth={auth} setAuth={setAuth} />}/>
          <Route path="/register" component={() => <RegisterInstructor setAuth={setAuth} />}/>
        </Switch>
      </Router>
    </>
  )
    
};
