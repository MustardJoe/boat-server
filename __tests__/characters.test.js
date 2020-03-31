require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');

const Character = require('../lib/models/Character');

describe('Character Routes', () => {
  let character = null;

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
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('Can POST a CHARACTER', () => {
    return request(app)
      .post('/api/v1/characters')
      .send({
        name: 'Sherif Cooper',
        image: 'SherifCooper.jpg'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Sherif Cooper',
          image: 'SherifCooper.jpg'
        });
      });
  });

  it('Can GET all CHARACTERS', () => {
    return request(app)
      .get('/api/v1/characters')
      .then(res => {
        expect(res.body).toEqual([{
          _id: expect.any(String),
          name: 'Bob',
          image: 'hereisimage.png'
        }]);
      });
  });

  it('Can GET a single Character by ID', () => {
    return request(app)
      .get(`/api/v1/characters/${character._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Bob',
          image: 'hereisimage.png'
        });
      });
  });

  it('can PUT to UPDATE CHARACTER by ID', () => {
    return request(app)
      .patch(`/api/v1/characters/${character._id}`)
      .send({
        ...character,
        image: 'aBetterPicture.jpg'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: character._id,
          name: 'Bob',
          image: 'aBetterPicture.jpg'
        });
      });
  });

  it('can DELETE a CHARACTER by ID', () => {
    return request(app)
      .delete(`/api/v1/characters/${character._id}`)
      .then(res => {
        expect(res.body).toEqual(character);
      });
  });  

});
