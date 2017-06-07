import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

export default class Loading extends React.Component {
  render() {
    const centerStyle = {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      margin: 'auto'
    };

    return (
      <div className="loading">
        <CircularProgress
          style={centerStyle}
          size={150}
          thickness={6}
        />
      </div>
    );
  }
}

Loading.propTypes = {};
Loading.defaultProps = {};
