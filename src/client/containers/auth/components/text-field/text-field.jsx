import React from 'react';

import MUITextField from 'material-ui/TextField';

export default class TextField extends React.Component {
  render() {
    const styles = {
      floatingLabel: {
        color: '#37474f',
        fontWeight: 500,
        fontSize: '18px',
        lineHeight: '24px'
      },
      underline: {
        borderColor: '#37474f'
      },
      underlineFocus: {
        borderColor: '#43A047'
      }
    };

    return (
      <MUITextField
        floatingLabelStyle={styles.floatingLabel}
        underlineStyle={styles.underline}
        underlineFocusStyle={styles.underlineFocus}
        {...this.props}
      />
    );
  }
}
