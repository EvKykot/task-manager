import React from 'react';
import classes from './home-wrap.scss';
import Page from '../page';
import {connect} from 'react-redux';
import {hasCookie} from '../../utils/tricks';
import {
  getNotesData,
  createNote,
  deleteNote,
  startCorrectNote,
  cancelCorrectNote,
  saveCorrectedNote
} from '../../redux/notes/notes.actions';
import Loading from '../../components/loading';
import Notes from '../../components/notes';

class HomeWrap extends React.Component {
  constructor(props) {
    super(props);

    this.handleCreateNote = this.handleCreateNote.bind(this);
    this.handleDeleteNote = this.handleDeleteNote.bind(this);
    this.handleStartCorrectNote = this.handleStartCorrectNote.bind(this);
    this.handleCancelCorrectionNote = this.handleCancelCorrectionNote.bind(this);
    this.handleSaveCorrectedNote = this.handleSaveCorrectedNote.bind(this);
  }

  handleCreateNote(note) {
    const {dispatch} = this.props;
    dispatch(createNote(note));
  }

  handleDeleteNote(_id) {
    const {dispatch} = this.props;
    dispatch(deleteNote({_id}));
  }

  handleStartCorrectNote(_id) {
    const {dispatch} = this.props;
    dispatch(startCorrectNote({_id}));
  }

  handleCancelCorrectionNote() {
    const {dispatch} = this.props;
    dispatch(cancelCorrectNote());
  }

  handleSaveCorrectedNote(correctedNote) {
    const {dispatch} = this.props;
    dispatch(saveCorrectedNote(correctedNote));
  }

  componentDidMount() {
    const {dispatch} = this.props;
    if (hasCookie('jwt')) {
      dispatch(getNotesData());
    }
  }

  render() {
    const {
      notes: {
        loadingNotes,
        dataNotes,
        noteInCorrectionProcess
      }
    } = this.props;

    return (
      <Page>
        <div className={classes.homeWrap}>
          {loadingNotes
            ? <Loading />
            : <Notes
              dataNotes={dataNotes}
              handleCreateNote={this.handleCreateNote}
              handleDeleteNote={this.handleDeleteNote}
              handleStartCorrectNote={this.handleStartCorrectNote}
              noteInCorrectionProcess={noteInCorrectionProcess}
              handleCancelCorrectionNote={this.handleCancelCorrectionNote}
              handleSaveCorrectedNote={this.handleSaveCorrectedNote}
            />
          }
        </div>
      </Page>
    );
  }
}

const selector = (state) => ({notes: state.notes});

export default connect(selector)(HomeWrap);
