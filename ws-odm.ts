import express from 'express';
import mongoose, { Schema } from 'mongoose';
import { exposeCrud } from './rest';

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

app.get('/now', function (req, res) {
    res.json({ date: new Date() });
});

exposeCrud(app, '/user', User);