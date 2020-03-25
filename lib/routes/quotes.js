const { Router } = require('express');
const Quote = require('../models/Quote');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      speaker, body,
    } = req.body;

    Quote
      .create({ speaker, body })
      .then(quote => res.send(quote))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Quote
      .find()
      .then(quotes => {
        res.send(quotes);
      })
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Character
      .findById(req.params.id)
      .then(character => res.send(character))
      .catch(next);
  })

  // .patch('/:id', (req, res, next) => {
  //   const {
  //     name
  //   } = req.body;

  //   Character
  //     .findByIdAndUpdate(req.params.id, { name }, { new: true })
  //     .then(character => res.send(character))
  //     .catch(next);
  // })

  .delete('/:id', (req, res, next) => {
    Character
      .findByIdAndDelete(req.params.id)
      .then(character => res.send(character))
      .catch(next);
  });
