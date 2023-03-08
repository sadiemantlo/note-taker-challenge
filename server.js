// require
const express = require('express');
const path = require('path');
const fs = require('fs');
const db = require('./db/db.json');
// const apiRoutes = require('./routes/apiRoutes');
// const htmlRoutes = require('./routes/htmlRoutes');
// initialization 
const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.json());
app.use(express.urlencoded( {extended: true} ));
app.use(express.static('public'));
// app.use('./api', apiRoutes);
// app.use('/', htmlRoutes);
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
});
app.get('/api/notes', (req, res) => {
    const savedNotes = db;
    res.json(savedNotes)
});
app.post('/api/notes', (req, res) => {
    const savedNotes = db;
    const newNote = req.body; 
    savedNotes.push(newNote);
    console.log(savedNotes);
    fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(savedNotes));
    res.status(200).JSON(savedNotes);
})
// open server PORT
app.listen(PORT, () => console.log(`listening on PORT ${PORT} :)`));
