const { Router } = require('express');
const Quote = require('../models/Quote');

module.exports = Router()
// .post('/', (req, res, next) => {
//   const {
//     character, body,
//   } = req.body;

//   Quote
//     .create({ character, body })
//     .then(quote => res.send(quote))
//     .catch(next);
// })

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

// .patch('/:id', (req, res, next) => {
//   const {
//     name, body
//   } = req.body;

//   Quote
//     .findByIdAndUpdate(req.params.id, { name, body }, { new: true })
//     .then(quote => res.send(quote))
//     .catch(next);
// })

// .delete('/:id', (req, res, next) => {
//   Quote
//     .findByIdAndDelete(req.params.id)
//     .then(quote => res.send(quote))
//     .catch(next);
// });
