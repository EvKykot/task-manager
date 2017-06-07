import classes from './dashboard.scss';
import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {fetchProfile, logout} from '../../redux/profile/profile.actions.js';
import {hasCookie} from '../../utils/auth.utils';
import Loading from '../../components/loading';
import Page from '../page';
import RaisedButton from 'material-ui/RaisedButton';

class Dashboard extends React.Component {
  componentDidMount() {
    const {dispatch, profile: {isLoaded}} = this.props;

    if (!isLoaded && hasCookie('jwt')) {
      dispatch((dispatch) => {
        dispatch(fetchProfile());
      });
    }
  }

  renderUserInfo() {
    const {dispatch, profile} = this.props;

    return (
      <div>

        <ul className={classes.emailUser}>
          <li>Email: <i>{profile.email}</i></li>
        </ul>

        <div className={classes.button}>
          <RaisedButton
            label="Log out"
            primary={true}
            onTouchTap={() => dispatch(logout())}
          />
        </div>

      </div>
    );
  }

  render() {
    const {profile} = this.props;

    return (
      <Page>
        <div className={classes.root}>

          <div className={classes.auth}>
            <Link
              className={classes.link}
              to="/auth"
            >
              Authentication page
            </Link>
          </div>

          {!profile.isLoaded ? <Loading /> : this.renderUserInfo()}

        </div>
      </Page>
    );
  }
}

Dashboard.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  profile: React.PropTypes.object.isRequired,
};

Dashboard.defaultProps = {};

const selector = state => ({profile: state.profile});

export default connect(selector)(Dashboard);
