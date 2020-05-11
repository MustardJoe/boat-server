const { Router } = require('express');
const Quote = require('../models/Quote');

module.exports = Router()

  .get('/', (req, res, next) => {
    Quote
      .find()
      .then(quotes => {
        res.send(quotes);
      })
      .catch(next);
  })

  .get('/randomQuote', (req, res, next) => {
    Quote
      .randomQuote()
      .then(quote => {
        res.send(quote);
      })
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Quote
      .findById(req.params.id)
      .then(quote => res.send(quote))
      .catch(next);
  });
