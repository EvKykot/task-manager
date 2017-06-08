import React from 'react';
import classes from './notes.scss';

import NoteEditor from '../note-editor';
import NotesGrid from '../notes-grid';

export default class Notes extends React.Component {

  render() {
    const {
      dataNotes,
      handleCreateNote,
      handleDeleteNote,
      handleStartCorrectNote,
      noteInCorrectionProcess,
      handleCancelCorrectionNote,
      handleSaveCorrectedNote
    } = this.props;

    return (
      <div className={classes.notes}>
        <NoteEditor
          handleCreateNote={handleCreateNote}
          noteInCorrectionProcess={noteInCorrectionProcess}
          handleCancelCorrectionNote={handleCancelCorrectionNote}
          handleSaveCorrectedNote={handleSaveCorrectedNote}
        />
        <NotesGrid
          dataNotes={dataNotes}
          handleDeleteNote={handleDeleteNote}
          handleStartCorrectNote={handleStartCorrectNote}
          handleSaveCorrectedNote={handleSaveCorrectedNote}
        />
      </div>
    );
  }
}
