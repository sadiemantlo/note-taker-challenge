const router = require('express').Router();
const path = require('path');
const db = require('../db/db.json');
const fs = require('fs');


// gets the saved notes array 
router.get('/notes', (req, res) => {
    const savedNotes = db;
    res.json(savedNotes)
});

// adds new notes to saved notes array 
router.post('/notes', (req, res) => {
    const savedNotes = db;
    const newNote = req.body; 
    req.body.id = getID();
    savedNotes.push(newNote);
    console.log(savedNotes);
    fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(savedNotes));
    res.status(200).json(savedNotes);
});

// adds an id to each note (check for a better way bc this is alot)
let notesArray = [];
fs.readFile('./db/db.json', (err, data) => {
    if (err) {
        console.log(err);
        return;
    }
    const parsedNotes = JSON.parse(data);
    for (let i = 0; i < parsedNotes.length; i++) {
        notesArray.push(parsedNotes[i]);
    }
});

const getID = () => {
    let noteID = Math.floor(Math.random() * 99) + 1;
    if (notesArray.length === 0) {
        notesArray.push(noteID);
    } else {
        for (let i = 0; i < notesArray.length; i++) {
            if (notesArray[i] === noteID) {
                noteID = Math.floor(Math.random() * 99) + 1;
                i = 0;
            }
        }
        notesArray.push(noteID);
    }
    return notesArray[notesArray.length - 1]; 
}

module.exports = router;