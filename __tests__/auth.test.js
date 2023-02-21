'use strict';

const supertest = require('supertest');
const { app } = require('../src/server');
const request = supertest(app);
const { sequelizeDatabase } = require('../src/auth/models/index');

beforeAll(async () => {
  await sequelizeDatabase.sync();
});

afterAll(async () => {
  await sequelizeDatabase.drop();
});

describe('Auth router', () => {
  it('should create a new user', async () => {
    const response = await request.post('/signup').send({
      username: 'Jeremy',
      password: 'pass69',
    });
    expect(response.status).toBe(200);
  });

  it('should login a user', async () => {
    let response = await request.post('/signin').auth('Jeremy', 'pass69');

    expect(response.status).toBe(200);
    expect(response.body.username).toBe('Jeremy');
  });
});
