'use strict';

const Note = require('../../models/note.model');

const NotesController = {

  create: (req, res, next) => {
    const { title, color, text } = req.body;

    Note.create({title, color, text})
      .then(note => res.json(note))
      .catch(err => next(err));
  },

  get: (req, res, next) => {
    Note.get()
      .then((notes) => {
        return res.json(notes)
      })
      .catch(err => next(err));
  },

  update: (req, res, next) => {
    let updateParams = JSON.parse(JSON.stringify(req.body));
    const _id = req.body._id;

    delete updateParams._id;

    const params = {
      _id,
      updateParams
    };

    Note.update(params)
      .then((note) => {
        note;
        res.json(note)
      })
      .catch(err => next(err));
  },

  delete: (req, res, next) => {
    const {_id} = req.body;

    Note.remove({_id})
      .then(() => res.json({_id}))
      .catch(err => next(err));
  }

};

module.exports = NotesController;
