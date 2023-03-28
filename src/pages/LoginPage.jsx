import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FullLogo from '../components/FullLogo';
import Head from '../components/Head';
import { ReactComponent as Rocket } from '../assets/rocket.svg';

const LoginPage = ({ location, history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <section className="authScreen">
      <Head title="Sign In" />
      <div className="authScreen__content">
        <FullLogo />
        <div className="authScreen__formContainer">
          <h2 className="heading-md">Sign In</h2>
          <form>
            <div className="form__group mt-3">
              <label className="form__label mb-1">Email Address</label>
              <input
                className="form__input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form__group mt-3">
              <label className="form__label mb-1">Password</label>
              <input
                autoComplete="on"
                className="form__input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button className="form__submitBtn mt-3" type="submit">
              Sign In
            </button>

            <p className="mt-2 form__question">
              Don't have an account ?{' '}
              <Link className="minor-link" to="/register">
                Sign Up
              </Link>
            </p>
            <div className="separator">OR</div>

            <button
              className="form__submitBtn form__submitBtn-guest"
            >
              Continue as a Guest
            </button>
          </form>
        </div>
      </div>
      <div className="authScreen__decor">
        <div className="authScreen__background">
          <h3 className="authScreen__intro">Connecting the world, one click at a time</h3>
          <p className="authScreen__introText">Developed by Group E</p>
          <Rocket className="authScreen__rocket" />
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
