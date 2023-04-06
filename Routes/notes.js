const notes = require('express').Router();
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/node-fsutils.js');
const path = require('path');

//get route of all saved notes
notes.get('/notes', (req, res) => 
    readFromFile('../db/db.json').then((data) => res.json(JSON.parse(data))));


//post route to save new note
notes.post('/notes', (req, res) => {
    console.log(req.body);

    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
        };

        readAndAppend(newNote, '../db/db.json');
        res.json(`Note added successfully`);
    } else {
        res.error('Error in adding note');
    }
});

//delete route to delete note
notes.delete('/notes/:id', (req, res) => {
    const noteId = req.params.id;
    console.log(noteId);
    readFromFile('../db/db.json').then((data) => {
        const notes = JSON.parse(data);
        const newNotes = notes.filter((note) => note.id !== noteId);
        writeToFile('../db/db.json', newNotes);
        res.json(`Note deleted successfully`);
    });
});

module.exports = notes;