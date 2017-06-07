import classes from './page.scss';
import React from 'react';

import Header from './components/header';
import Footer from './components/footer';

export default class Page extends React.Component {
  render() {
    return (
      <section className={classes.pageWrap} >
        <Header />

        <section className={classes.mainWrapper}>
          {this.props.children}
          <Footer />
        </section>

      </section>
    );
  }
}
