const router = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/node-fsutils.js');
const path = require('path')

// GET Route for retrieving all the notes
router.get('/notes', (req, res) => {
  console.log("test route")
  readFromFile(path.join(__dirname,'../db/db.json')).then((data) => {
        console.log(JSON.parse(data));
        res.json(JSON.parse(data));
       
   });
  });

router.post('/notes', (req, res) => {

  const { title, text } = req.body;
  
  if (req.body) {
    const newNote = {
     title,
     text
    };

    readAndAppend(newNote, path.join(__dirname,'../db/db.json'));
    res.json(`Note added successfully 🚀`);
  } else {
    res.error('Error in adding note');
  }
});

module.exports = router;