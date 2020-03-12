import express from 'express';
import mongoose, { Schema, Document } from 'mongoose';

const User = mongoose.model('user', new Schema({
    lastname: String,
    firstname: String
}));

async function start() {
    try {
        const client = await mongoose.connect('mongodb://localhost:27017/orsys', { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('connected.');

    } catch (error) {
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

app.post('/user', async function (req, res, next) {
    try {
        let user: Document;
        console.log('req.body', req.body);
        try {
            user = new User(req.body);
        } catch (error) {
            return res.status(400).end();
        }
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(500).end();
    }
});
