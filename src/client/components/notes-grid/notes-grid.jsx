import React from 'react';
import Masonry from 'react-masonry-component';
import classes from './notes-grid.scss';
import Note from '../note';

export default class NotesGrid extends React.Component {
  constructor(props) {
    super(props);

    this.displayNotes = this.displayNotes.bind(this);
  }

  displayNotes(arr) {
    const {
      handleDeleteNote,
      handleStartCorrectNote,
      handleSaveCorrectedNote
    } = this.props;

    return arr.map((row, ind) =>
      <Note
        key={ind}
        title={row.title}
        color={row.color}
        text={row.text}
        _id={row._id}
        dataNotes={row}
        handleDeleteNote={handleDeleteNote}
        handleStartCorrectNote={handleStartCorrectNote}
        handleSaveCorrectedNote={handleSaveCorrectedNote}
      />
    )
  }

  render() {
    const masonryOptions = {
      columnWidth: 250,
      gutter: 10,
      isFitWidth: true
    };
    const {dataNotes} = this.props;

    return (
      <Masonry
        className={classes.NotesGrid}
        options={masonryOptions}
      >
        {this.displayNotes(dataNotes)}
      </Masonry>
    );
  }
}
