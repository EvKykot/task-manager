'use strict';

const AuthErrors = require('../api/auth/auth.errors');
const ObjectId = require('mongodb').ObjectId;
const MDB = require('./mdb');

const Note = MDB.collection({
  name: 'note'
}, {
  get: ($) => {
    return $
      .find()
      .toArray();
  },
  create: ($, data) => {
    const note = {
      _id: new ObjectId(),
      title: data.title,
      text: data.text,
      color: data.color,
      startTime: null,
      endTime: null,
      elapsed: 0,
      runningTimer: false,
      done: false,
    };

    return $
      .insertOne(note)
      .then(() => {
        return note;
      })
      .catch(err => {
        if (err.code === 11000) {
          throw AuthErrors.userExist;
        }

        throw err;
      });
  },
  update: ($, params) => {
    const sQuery = {_id: new ObjectId(params._id)};

    const updatedNote = params.updateParams;
    return $
      .findOneAndUpdate(sQuery, updatedNote, { returnOriginal: false })
      .then((res) => res.value)
      .catch(err => {
        console.log(err);
        throw new Error('cannot update this Note');
      })
  },
  remove: ($, params) => {
    const sQuery = {_id: new ObjectId(params._id)};

    return $
      .removeOne(sQuery)
      .catch(err => {
        console.log(err);
        throw new Error('cannot remove this Note');
      });
  }
});

module.exports = Note;