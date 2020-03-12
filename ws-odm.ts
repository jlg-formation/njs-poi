import express from 'express';
import mongoose, { Schema, Document } from 'mongoose';

const User = mongoose.model('user', new Schema({
    lastname: String,
    firstname: String
}));

async function start() {
    try {
        await mongoose.connect('mongodb://localhost:27017/orsys', { useNewUrlParser: true, useUnifiedTopology: true });
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

app.get('/user', async function (req, res, next) {
    try {
        const result = await User.find();
        res.json(result);
    } catch (error) {
        res.status(500).end();
    }
});

app.get('/user/:id', async function (req, res, next) {
    try {
        const id = req.params.id;
        const result = await User.findById(id);
        if (!result) {
            return res.status(404).end();
        }
        res.json(result);
    } catch (error) {
        res.status(500).end();
    }
});

app.put('/user/:id', async function (req, res, next) {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        user.overwrite(req.body);
        await user.save();
        res.status(204).end();
    } catch (error) {
        console.error('error: ', error);
        res.status(500).end();
    }
});

app.patch('/user/:id', async function (req, res, next) {
    try {
        const id = req.params.id;
        const user = req.body;
        await User.findByIdAndUpdate(id, user, {});

        res.status(204).end();
    } catch (error) {
        console.error('error: ', error);
        res.status(500).end();
    }
});
