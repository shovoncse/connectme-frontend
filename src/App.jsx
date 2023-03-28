import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import PageNotFound from './pages/404-page';

function App() {

  return (
    <Router>
      <main>
        <div className="mainContainer">
            <Switch>
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/register" component={RegisterPage} />
              <Route exact path="/register" component={RegisterPage} />
              <Route exact path="/" component={HomePage} />
              <Route path="*" component={PageNotFound} />
            </Switch>
        </div>
      </main>
    </Router>
  );
}

export default App;
