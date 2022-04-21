import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/home';
import './App.scss';

/*
 * This component is only useful for local development.
 * It's purpose is to mimic /admin or /my-secrets route of parent Britive app.
 * This component is not part of the final build.
 */
const App = () => {
  return (
    <div className="app-container">
      <Router>
        <Switch>
          {/* Following route is only for local development purpose. */}
          <Route path="/" component={HomePage} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
