require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');

const Character = require('../lib/models/Character');
const Quote = require('../lib/models/Quote');

describe('routes for QUOTE model test', () => {

});
