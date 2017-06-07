import React from 'react';
import classes from './note-editor.scss';
import ColorPicker from '../color-picker';

export default class NoteEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      correctionProcess: false,
      _id: null,
      title: '',
      text: '',
      color: '#FFFFFF'
    };

    this.handleCreateNote = this.handleCreateNote.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
    this.handleSaveCorrectedNote = this.handleSaveCorrectedNote.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const {
      noteInCorrectionProcess: {
        process,
        note
      }
    } = nextProps;
    const {correctionProcess} = this.state;

    if (correctionProcess !== process) {
      if (process) {
        this.setState({
          correctionProcess: true,
          _id: note._id,
          title: note.title,
          text: note.text,
          color: note.color
        });
      } else {
        this.setState({
          correctionProcess: false,
          _id: null,
          title: '',
          text: '',
          color: '#FFFFFF'
        });
      }
    }
  }

  handleTextChange(event) {
    this.setState({ text: event.target.value });
  }

  handleTitleChange(event) {
    this.setState({ title: event.target.value });
  }

  handleColorChange(color) {
    this.setState({ color });
  }

  handleCreateNote() {
    const {handleCreateNote} = this.props;
    const {title, text, color} = this.state;
    const newNote = {title, text, color};

    handleCreateNote(newNote);
    this.setState({
      text: '',
      title: '',
      color: '#FFFFFF'
    });
  }

  handleSaveCorrectedNote() {
    const {handleSaveCorrectedNote} = this.props;
    const {_id, title, text, color} = this.state;
    const correctedNote = {_id, title, text, color};

    handleSaveCorrectedNote(correctedNote);
  }

  render() {
    let style = {backgroundColor: this.state.color};
    const {
      correctionProcess,
      title,
      text,
      color
    } = this.state;
    const {handleCancelCorrectionNote} = this.props;

    return (
      <div className={classes.NoteEditor} style={style}>

        <input
          type='text'
          className={classes.NoteEditor__title}
          placeholder='Enter title'
          style={style}
          value={title}
          onChange={this.handleTitleChange}
        />

        <textarea
          placeholder='Enter note text'
          rows={5}
          className={classes.NoteEditor__text}
          style={style}
          value={text}
          onChange={this.handleTextChange}
        />

        <div className={classes.NoteEditor__footer}>
          <ColorPicker
            value={color}
            handleColorChange={this.handleColorChange}
          />

          {correctionProcess
            ? <div className={classes.btn_wrap}>
                <button
                  className={classes.NoteEditor__button}
                  onClick={() => handleCancelCorrectionNote()}
                >
                  Cancel
                </button>
                <button
                  className={classes.NoteEditor__button}
                  disabled={!text && !title}
                  onClick={this.handleSaveCorrectedNote}
                >
                  Save
                </button>
            </div>
            : <button
                className={classes.NoteEditor__button}
                disabled={!text && !title}
                onClick={this.handleCreateNote}
              >
                Add
              </button>
          }
        </div>
      </div>
    );
  }
}