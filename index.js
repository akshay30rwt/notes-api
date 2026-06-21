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

app.delete('/notes/:id', (req, res) => {
    const noteId = Number(req.params.id);
    const index = notes.findIndex(note => note.id === noteId);

    if(index === -1) {
        res.status(404).json({ message: `Note with ID ${noteId} not found` });
        return;
    }

    const deletedNote = notes[index].title;
    notes.splice(index, 1);
    res.status(200).json({ message: `Note with title: '${deletedNote}' deleted.` })
});

app.put('/notes/:id', (req, res) => {
    const { title, content } = req.body;
    const noteId = Number(req.params.id);
    const index = notes.findIndex(note => note.id === noteId);

    if(index === -1) {
        res.status(404).json({ message: 'Note not found' });
        return;
    }
    notes[index].title = title;
    notes[index].content = content
    res.status(200).json({ message: `Note ${noteId} updated, title: '${notes[index].title}'` });
});

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});