const express = require('express');

const { connectToDb, getDb } = require('./db');
const { ObjectId } = require('mongodb');

const app = express();

// convert req body to json
app.use(express.json());

// db connection
connectToDb((err) => {
    if(!err) {
        app.listen(3000, () => {
            console.log('App listening on port 3000');
        });
    }
})

// routes
app.get('/books', (req, res) => {
    let books = [];
    getDb().collection('books')
        .find()
        .sort({ author: 1})
        .forEach(book => books.push(book))
        .then(() => {
            res.status(200).json(books);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({error: "Could not fetch the docuemnts."})
        });
});

app.get('/books/:id', (req, res) => {
    const id = req.params.id;

    if(!ObjectId.isValid(id)) { // check doc id is valid hexa string
        res.status(500).json({ error: "Id is not valid." });
        return;
    }
    
    getDb().collection('books')
        .findOne({_id: new ObjectId(id)})
        .then(doc => {
            res.status(200).json(doc)
        })
        .catch(() => {
            console.log(err);
            res.status(500).json({ error: "Could not fetch the docuemnts." })
        })
});

app.post('/books', (req, res) => {
    const book = req.body;
    getDb().collection('books')
        .insertOne(book)
        .then(result => {
            res.status(200).json(result)
        })
        .catch(() => {
            console.log(err);
            res.status(500).json({ error: "Could not add the docuemnts." })
        })
});

app.delete('/books/:id', (req, res) => {
    const id = req.params.id;
    if(!ObjectId.isValid(id)) {
        res.status(500).json({ error: "Could not delete the docuemnts. Invalid id." });
        return;
    }
    getDb().collection('books')
        .deleteOne({_id: new ObjectId(id)})
        .then(result => {
            res.status(200).json(result)
        })
        .catch(() => {
            console.log(err);
            res.status(500).json({ error: "Could not delete the docuemnts." })
        })
});

app.patch('/books/:id', (req, res) => {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
        res.status(500).json({ error: "Could not delete the docuemnts. Invalid id." });
        return;
    }
    const data = req.body;
    getDb().collection('books')
        .updateOne({ _id: new ObjectId(id) }, { $set: data })
        .then((result) => {
            res.status(200).json(result)
        })
        .catch(() => {
            console.log(err);
            res.status(500).json({ error: "Could not update the docuemnts." })
        })
})