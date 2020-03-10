const express = require('express');
const serveIndex = require('serve-index');
const ws = require('./ws');
const app = express();

app.use(function (req, res, next) {
    console.log('urlxxx', req.url);
    next();
});


app.use('/ws', ws);

const publicDir = './www';
app.use(express.static(publicDir));
app.use(serveIndex(publicDir, { icons: true }));

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

