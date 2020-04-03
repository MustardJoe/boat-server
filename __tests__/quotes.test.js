require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');

const Character = require('../lib/models/Character');
const Quote = require('../lib/models/Quote');

describe('routes for QUOTE model test', () => {
  let character = null;
  let quote = null;

  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  beforeEach(async() => {
    character = JSON.parse(JSON.stringify(await Character.create({ 
      name: 'Bob',
      image: 'hereisimage.png' })));
    quote = JSON.parse(JSON.stringify(await Quote.create({
      character: character._id,
      body: '"This is a real Twin Peaks quote that I, me, Bob, said."'
    })));
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can POST a QUOTE', () => {
    return request(app)
      .post('/api/v1/quotes')
      .send({
        character: character._id,
        body: '"My second real quote, by me, Bob, from Twin Peaks."'
      })
      .then(res => {
        expect(res.body).toEqual({
          character: [character._id],
          body: '"My second real quote, by me, Bob, from Twin Peaks."',
          _id: expect.any(String)
        });
      });
  });

  it('can GET all QUOTES', () => {
    return request(app)
      .get('/api/v1/quotes')
      .then(res => {
        expect(res.body).toEqual([{
          _id: quote._id,
          character: quote.character,
          /* eslint-disable-next-line */
          body: `"This is a real Twin Peaks quote that I, me, Bob, said."`
        }]);
      });
  });
  
  it('can GET a single QUOTE by id', () => {
    return request(app)
      .get(`/api/v1/quotes/${quote._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: quote._id,
          character: [character._id],
          body: '"This is a real Twin Peaks quote that I, me, Bob, said."'
        });
      });
  });

  it('can PATCH a QUOTE by id', () => {
    return request(app)
      .patch(`/api/v1/quotes/${quote._id}`)
      .send({
        body: '"HAVE SOME CAKE BECAUSE COOPER ALWAYS EATS BIRTHDAY CAKE"'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: quote._id,
          character: quote.character,
          body: '"HAVE SOME CAKE BECAUSE COOPER ALWAYS EATS BIRTHDAY CAKE"'
        });
      });
  });

  it('can DELETE a QUOTES by id', () => {
    return request(app)
      .delete(`/api/v1/quotes/${quote._id}`)
      .then(res => {
        expect(res.body).toEqual(quote);
      });
  });
});
