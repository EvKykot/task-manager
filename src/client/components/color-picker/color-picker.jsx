import React from 'react';
import classes from './color-picker.scss';
import ColorDisck from './color-disck';

const COLORS = [
  '#FFFFFF',
  '#80D8FF',
  '#FFFF8D',
  '#FF8A80',
  '#CCFF90',
  '#CFD8DC',
  '#FFD180'
];

export default class ColorPicker extends React.Component {
  render() {
    const {handleColorChange} = this.props;
    return (
      <div className={classes.ColorPicker}>
        {
          COLORS.map(color =>
            <ColorDisck
              key={color}
              color={color}
              handleColorChange={handleColorChange}
            />
          )
        }
      </div>
    );
  }
}
