import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { Navbar } from './components/Navbar.js';

export const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/students" component={() => <Navbar />} />
          <Route path="/mydocs" component={() => <Navbar />} />
        </Switch>
      </div>
    </Router>
  );
};
