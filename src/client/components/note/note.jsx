import React from 'react';
import classes from './note.scss';

export default class Note extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      title,
      text,
      color,
      _id,
      handleDeleteNote,
      handleStartCorrectNote
    } = this.props;
    const style = { backgroundColor: color };

    return (
      <div className={classes.Note} style={style}>

        <ul className={classes.Note_btn_list}>

          <li>
            <span onClick={() => handleStartCorrectNote(_id)}>
              <img src="../../images/ic_create_black_18px.svg"/>
            </span>
          </li>

          <li>
            <span onClick={() => handleDeleteNote(_id)}>
              <img src="../../images/ic_delete_black_18px.svg"/>
            </span>
          </li>

        </ul>

        {title
          ?<h4 className={classes.Note__title}>
              {title}
            </h4>
          :
          null
        }

        <div className={classes.Note__text}>
          {text}
        </div>
      </div>
    );
  }
}
