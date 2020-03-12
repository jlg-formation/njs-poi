import express from 'express';
import mongodb from 'mongodb';

let db: mongodb.Db;
async function start() {
    try {
        const client = await mongodb.connect('mongodb://localhost', { useUnifiedTopology: true });
        console.log('connected.');
        db = client.db('orsys');
    } catch (error) {
        db = undefined;
        console.error('db not available.');
        process.exit(1);
    }
}
start();
console.log('init...');
const app = express.Router();
export const ws = app;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/now', function (req, res, next) {
    res.json({ date: new Date() });
});

app.get('/user', async function (req, res, next) {
    if (!db) {
        res.status(500).end();
        return;
    }
    const collection = db.collection('user');
    const users = await collection.find({ lastname: /^G/ }).toArray();
    res.json(users);
});

app.post('/user', async function (req, res, next) {
    if (!db) {
        res.status(500).end();
        return;
    }
    try {
        const user = req.body;
        console.log('user: ', user);

        const collection = db.collection('user');
        const result = await collection.insertOne(user);
        res.status(201).json(result.ops[0]);
    } catch (error) {
        console.error('error: ', error);
        res.status(500).end();
    }

});
