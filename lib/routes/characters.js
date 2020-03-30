const { Router } = require('express');
const Character = require('../models/Character');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      name, image,
    } = req.body;

    Character
      .create({ name, image })
      .then(character => res.send(character))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Character
      .find()
      .then(characters => {
        res.send(characters);
      })
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Character
      .findById(req.params.id)
      .then(character => res.send(character))
      .catch(next);
  })

  .patch('/:id', (req, res, next) => {
    const {
      name, image
    } = req.body;

    Character
      .findByIdAndUpdate(req.params.id, { name, image }, { new: true })
      .then(character => res.send(character))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Character
      .findByIdAndDelete(req.params.id)
      .then(character => res.send(character))
      .catch(next);
  });
