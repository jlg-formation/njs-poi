const express = require('express');

const app = express.Router();
module.exports = app;

app.get('/now', function (req, res, next) {
    res.json({ date: new Date() });
});
