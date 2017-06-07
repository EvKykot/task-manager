import React from 'react';
import classes from './auth.scss';
import LoginForm from './components/login-form.jsx';
import SignupForm from './components/signup-form.jsx';
import Page from '../page';

class Auth extends React.Component {
  render() {
    return (
      <Page>
        <section>
          <section className={classes.root}>
            <div className={classes.container}>
              <div className={classes.block}>
                <LoginForm />
                <SignupForm />
              </div>
            </div>
          </section>
        </section>
      </Page>
    );
  }
}

export default Auth;
