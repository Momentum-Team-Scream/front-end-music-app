import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { Navbar } from './components/Navbar.js';
import { AssignmentForm } from './components/AssignmentForm.js';

export const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <AssignmentForm />
        <Switch>
          <Route path="/students" component={() => <Navbar />} />
          <Route path="/docs" component={() => <Navbar />} />
        </Switch>
      </div>
    </Router>
  );
};
