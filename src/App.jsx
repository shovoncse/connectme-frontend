import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import PageNotFound from './pages/404-page';
import { ReactComponent as Logo } from './assets/logo.jpg';

function App() {

  const userLogin = useSelector((state) => state.userLogin);
  const { tokenLoading, userInfo } = userLogin;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
    if (userInfo && userInfo.accessToken) {
      dispatch(getUnreadNotifications());
    }
    // eslint-disable-next-line
  }, [dispatch]);

  return (
    <Router>
      <main>
        <div className="mainContainer">
          {!tokenLoading ? (
            <Switch>
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/register" component={RegisterPage} />
              <ProtectedRoute exact path="/" component={HomePage} />
              <Route path="*" component={PageNotFound} />
            </Switch>
          ) : (
            <div className="token-loading">
              <Logo className="token-loading-logo" />
            </div>
          )}
        </div>
      </main>
    </Router>
  );
}

export default App;
