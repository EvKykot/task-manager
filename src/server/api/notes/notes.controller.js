'use strict';

const Note = require('../../models/note.model');

const NotesController = {

  create: (req, res, next) => {
    const { title, color, text } = req.body;
    Note.create({title, color, text})
      .then((note) => {
        return res.json(note);
      })
      .catch(err => next(err));
  },

  get: (req, res, next) => {
    Note.get()
      .then((notes) => {
        return res.json(notes);
      })
      .catch(err => next(err));
  },

  update: (req, res, next) => {
    const {_id, title, color, text} = req.body;

    Note.update(req.body)
      .then((note) => {
      return res.json(note);
      })
      .catch(err => next(err));
  },

  delete: (req, res, next) => {
    const {_id} = req.body;

    Note.remove({_id})
      .then(() => {
        return res.json({_id});
      })
      .catch(err => next(err));
  }

};

module.exports = NotesController;
