const routes= require('express').Router();
const {createNote, updateNote, deleteNote, fetchNote} = require('../controllers/note.controller');

routes.post('/newNote', createNote);
routes.put('/editNote/:id', updateNote);
routes.delete('/deleteNote/:id', deleteNote);
routes.get('/allNote/:email', fetchNote);

module.exports= routes;