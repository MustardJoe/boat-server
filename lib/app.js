const express = require('express');
const app = express();
const logger = require('morgan');

app.use(express.json());
app.use(logger('dev'));

app.use('/api/v1/characters', require('./routes/characters'));
app.use('/api/v1/quotes', require('./routes/quotes'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
