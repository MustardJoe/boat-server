require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');

const Character = require('../lib/models/Character');

describe('Character Routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  beforeEach(async() => {
    let character = JSON.parse(JSON.stringify(await Character.create({ 
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
});
