import React from 'react';
import classes from './color-disck.scss';

export default class ColorDisck extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {color, handleColorChange} = this.props;
    const style = {
      backgroundColor: color
    };

    return (
      <div
        className={classes.ColorPicker__swatch}
        style={style}
        onClick={() => handleColorChange(color)}
      />
    );
  }
}
