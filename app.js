const express = require('express');

const { connectToDb, getDb } = require('./db');
const { ObjectId } = require('mongodb');

const app = express();

// db connection
let db;
connectToDb((err) => {
    if(!err) {
        app.listen(3000, () => {
            console.log('App listening on port 3000');
        });
        db = getDb();
    }
})

// routes
app.get('/books', (req, res) => {
    let books = [];
    db.collection('books')
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
    
    db.collection('books')
        .findOne({_id: new ObjectId(id)})
        .then(doc => {
            res.status(200).json(doc)
        })
        .catch(() => {
            console.log(err);
            res.status(500).json({ error: "Could not fetch the docuemnts." })
        })
})