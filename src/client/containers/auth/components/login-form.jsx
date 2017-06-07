import React from 'react';
import {Paper, RaisedButton} from 'material-ui';
import {browserHistory} from 'react-router';
import classes from '../auth.scss';
import AuthApi from '../../../api/auth.api.js';

import TextField from './text-field';

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };

    this.setValue = this.setValue.bind(this);
    this.login = this.login.bind(this);
  }

  setValue(field, value) {
    this.setState({[field]: value});
  }

  login(e) {
    e.preventDefault();

    AuthApi.login(this.state, (err, response) => {
      if (err) {
        return alert(err.message || 'Error');
      }

      browserHistory.push('/dashboard');
      // browserHistory.push('/home');
    });
  }

  render() {
    const {email, password} = this.state;

    return (
      <section className={classes.login}>
        <h2 className={classes.title}>Login</h2>

        <Paper zDepth={1}>
          <div className={classes.content}>
            <form action="./" onSubmit={this.login}>

              <TextField
                fullWidth={true}
                required
                type="email"
                value={email}
                onChange={(e, val) => this.setValue('email', val)}
                floatingLabelText="Email"
              />

              <TextField
                fullWidth={true}
                required
                type="password"
                value={password}
                onChange={(e, val) => this.setValue('password', val)}
                floatingLabelText="Password"
              />

              <div className={classes.btnCnt}>
                <RaisedButton
                  label="Login"
                  type="submit"
                  secondary={true}
                />
              </div>

            </form>
          </div>
        </Paper>
      </section>
    );
  }
}
