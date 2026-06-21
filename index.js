const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());

let notes = [];
let nextId = 1;

app.get('/', (req, res) => {
    res.send('Notes API is running');
});

app.get('/notes', (req, res) => {
    res.json(notes);
});

app.post('/notes', (req, res) => {
    const { title, content } = req.body;

    const newNote = {
        id: nextId,
        title: title,
        content: content
    }

    nextId++;
    notes.push(newNote);

    res.status(201).json(newNote);
});

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});