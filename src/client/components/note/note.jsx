import React from 'react';
import classes from './note.scss';

export default class Note extends React.Component {
  constructor(props) {
    super(props);

    const {
      dataNotes: {
        runningTimer,
        startTime,
        endTime,
        elapsed,
        done
      }
    } = props;

    this.state = {
      runningTimer,
      elapsed,
      lastTick: 0,
      startTime,
      endTime,
      done
    };

    this.handleStartTime = this.handleStartTime.bind(this);
    this.handlePauseTime = this.handlePauseTime.bind(this);
    this.handleStopTime = this.handleStopTime.bind(this);
    this.tick = this.tick.bind(this);
    this.updateNote = this.updateNote.bind(this);
  }

  componentDidMount() {
    const {

    } = this.state;
    this.timeInterval = setInterval(this.tick, 1000);

    if ()
  }

  componentWillUnmount() {
    clearInterval(this.timeInterval);
  }

  tick() {
    const { runningTimer, elapsed, lastTick } = this.state;

    if (runningTimer) {
      let now = Date.now();
      let dif = now - lastTick;

      this.setState({
        elapsed: elapsed + dif,
        lastTick: now
      });
    }
  }

  handleStartTime() {
    this.setState({
      runningTimer: true,
      lastTick: Date.now(),
      startTime: Date.now(),
    }, () => {
      const newState = this.state;
      this.updateNote(newState);
    });
  }

  handlePauseTime() {
    this.setState({
      runningTimer: false
    }, () => {
      this.updateNote(this.state);
    })
  }

  handleStopTime() {
    this.setState({
      runningTimer: false,
      elapsed: 0,
      lastTick: 0,
      startTime,
      endTime,
      done
    }, () => {
      this.updateNote(this.state);
    })
  }

  updateNote(updateState) {
    console.log(updateState);
    const {
      handleSaveCorrectedNote,
      title,
      text,
      color,
      _id
    } = this.props;
    const {
      runningTimer,
      elapsed,
      startTime,
      endTime,
      done
    } = updateState;
    const updatedNote = {
      runningTimer,
      elapsed,
      startTime,
      endTime,
      done,
      title,
      text,
      color,
      _id
    };
console.log(updatedNote);
    console.log(handleSaveCorrectedNote);
    handleSaveCorrectedNote(updatedNote);
  }

  formatTime(milliseconds) {
    let totalSeconds = Math.floor(milliseconds / 1000);
    let totalMinutes = Math.floor(totalSeconds / 60);

    let hours = Math.floor(totalMinutes / 60);
    let minutes = totalMinutes % 60;
    let seconds = totalSeconds % 60;

    return `${hours > 9 ? hours : '0' + hours}:${minutes > 9 ? minutes : '0' + minutes}:${seconds > 9 ? seconds : '0' + seconds}`;
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
    const {
      runningTimer,
      elapsed
    } = this.state;

    const style = { backgroundColor: color };

    let time = this.formatTime(elapsed);

    return (
      <div className={classes.Note} style={style}>

        <section className={classes.timeTrack}>

          <div className={classes.time}>
            {time}
          </div>

          <div className={classes.timeTrackControl}>

            {runningTimer

              ? <span onClick={this.handlePauseTime}>
                  <img src="../../images/ic_pause_black_18px.svg"/>
                </span>

              : <span onClick={this.handleStartTime}>
                  <img src="../../images/ic_play_arrow_black_18px.svg"/>
                </span>

            }

            <span onClick={this.handleStopTime}>
              <img src="../../images/ic_stop_black_18px.svg"/>
            </span>

          </div>
        </section>

        {title ? <h4 className={classes.Note__title}> {title} </h4> : null }

        <div className={classes.Note__text}>
          {text}
        </div>

        <ul className={classes.Note_btn_list}>

          <li>
            <span>
              <img src="../../images/ic_crop_din_black_18px.svg"/>
              {/*ic_flag_black_18px.svg*/}
            </span>
          </li>

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

      </div>
    );
  }
}
