'use strict';

const router = require('express').Router();
// const NotesValidate = require('./auth.validate');
const NotesController = require('./notes.controller.js');

router.post('/',
  NotesController.create
);

router.get('/',
  NotesController.get
);

router.put('/',
  NotesController.update
);

router.delete('/',
  NotesController.delete
);

module.exports = router;
