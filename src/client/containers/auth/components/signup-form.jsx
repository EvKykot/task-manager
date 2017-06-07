import React from 'react';
import {Paper, RaisedButton} from 'material-ui';
import classes from '../auth.scss';
import AuthApi from '../../../api/auth.api.js';

import TextField from './text-field';

export default class SignupForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      confirmPassword: ''
    };

    this.setValue = this.setValue.bind(this);
    this.signup = this.signup.bind(this);
  }

  setValue(field, value) {
    this.setState({[field]: value});
  }

  signup(e) {
    e.preventDefault();

    if (this.state.password !== this.state.confirmPassword) {
      return alert('Password mismatch');
    }

    AuthApi.signup(this.state, (err, response) => {
      if (err) {
        return alert(err.message || 'Error');
      }

      this.setState({email: '', password: '', confirmPassword: ''});

      alert(`Account created. Please verify your email "${response.email}" and log in`);
    });
  }

  render() {
    const {
      email,
      password,
      confirmPassword
    } = this.state;

    return (
      <section className={classes.signup}>
        <h2 className={classes.title}>Signup</h2>
        <Paper zDepth={1}>
          <div className={classes.content}>
            <form action="./" onSubmit={this.signup}>

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
                value={password}
                onChange={(e, val) => this.setValue('password', val)}
                floatingLabelText="Password"
                type="password"
              />

              <TextField
                fullWidth={true}
                required
                value={confirmPassword}
                onChange={(e, val) => this.setValue('confirmPassword', val)}
                floatingLabelText="Confirm Password"
                type="password"
              />

              <div className={classes.btnCnt}>
                <RaisedButton
                  type="submit"
                  label="Create Account"
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
