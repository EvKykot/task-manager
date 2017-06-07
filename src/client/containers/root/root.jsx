import 'normalize.css';
import './reset.scss';
import classes from './root.scss';
import React from 'react';
import {connect} from 'react-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme({}, {
  palette: {
    primary1Color: '#1E88E5'
  },
  raisedButton: {
    primaryColor: '#e53935',
    secondaryColor: '#43A047'
  }
});

class Root extends React.Component {
  render() {
    return (
      <section className={classes.root}>
        <MuiThemeProvider muiTheme={muiTheme}>
          {this.props.children}
        </MuiThemeProvider>
      </section>
    );
  }
}

Root.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  children: React.PropTypes.node.isRequired
};

Root.defaultProps = {};

const selector = state => ({});

export default connect(selector)(Root);
