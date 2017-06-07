import classes from './footer.scss';
import React from 'react';

export default class Footer extends React.Component {
  render() {
    return (
      <section className={classes.footerWrap} >
        <p className={classes.copyright}>Copyright © Task Manager, 2017. All rights reserved.</p>
      </section>
    );
  }
}
