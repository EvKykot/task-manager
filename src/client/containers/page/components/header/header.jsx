import classes from './header.scss';
import React from 'react';
import {Link} from 'react-router';

export default class Header extends React.Component {
  render() {
    return (
      <section className={classes.headerWrap} >

        <div className={classes.headerLogo}>
          <h1 className={classes.tagline}>Task Manager</h1>
        </div>

        <div className={classes.headerNav}>

          <Link
            className={classes.headerNavLink}
            to="/home"
          >
            Tasks List
          </Link>

          <Link
            className={classes.headerNavLink}
            to="/auth"
          >
            Auth
          </Link>

          <Link
            className={classes.headerNavLink}
            to="/dashboard"
          >
            Dashboard
          </Link>

        </div>

      </section>
    );
  }
}
