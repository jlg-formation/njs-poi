const express = require('express');
const mongodb = require('mongodb');

let db;
async function start() {
    try {
        const client = await mongodb.connect('mongodb://localhost', { useUnifiedTopology: true });
        db = client.db('orsys');
    } catch (error) {
        db = undefined;
        console.error('db not available.');
        process.exit(1);
    }
}
start();

const app = express.Router();
module.exports = app;


app.get('/now', function (req, res, next) {
    res.json({ date: new Date() });
});

app.get('/user', async function (req, res, next) {
    if (!db) {
        res.status(500).end();
        return;
    }
    const collection = db.collection('user');
    const users = await collection.find({lastname: /^G/}).toArray();
    res.json(users);
});
