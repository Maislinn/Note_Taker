const router = require('express').Router();
//const apiRoutes = require('./apiRoutes');
const {readFromFile, readAndAppend, writeToFile} = require('../helpers/node-fsutils.js');
const path = require('path');

// GET Route for retrieving all the notes
router.get('/notes', (req, res) => {
   console.log('api routes')
   readFromFile(path.join(__dirname, '../db/db.json')).then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new note
router.post('/notes', (req, res) => {
    console.log(req.body);

    const { title, text } = req.body;

    if (title && text) {
    
        const newNote = {
            title,
            text,
        };

        readAndAppend(newNote, './db/db.json');
        res.json(`Note added successfully`);
    } else {
        res.error('Error in adding note');
    }
});

module.exports = router;

