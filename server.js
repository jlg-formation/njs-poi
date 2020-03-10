const express = require('express');
const app = express();

app.use(function (req, res, next) {
    console.log('url', req.url);
    next();
});

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

