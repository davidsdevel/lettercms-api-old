const exists = require('../../davidsdevel-accounts/api/exists');
const index = require('../../davidsdevel-accounts/api/index');
const Model = require('../../davidsdevel-accounts/lib/database');
const {fakeServer} = require('../utils');
const {connection} = require('@lettercms/utils');

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJkb21haW4iOiJ0ZXN0aW5nIiwiaWF0IjoxNjE0Mjc5MzM5fQ.khqm6uX0O4DtE3XR9yrqTRT3ZukdyxbyfXe1MVXvjVI';

beforeAll(async () => {
  if (!connection.isConnected)
    await connection.connect();
});
afterAll(async () => {
  await Model.Accounts.deleteMany({subdomain: 'testing'});

  if (connection.isConnected)
    await connection.disconnect();
});

describe('Accounts API Testing', () => {
  test('GET - Exists Account', async () => {
    await fakeServer(index, {
      url:  '/api/account',
      headers: {
        authorization: token
      },
      method: 'POST',
      body: {
        name: 'Test User',
        lastname: 'Test LastName',
        verified: true,
        role: 'admin',
        email:'email@test.com',
        password: '1234',
      }
    });

    const res = await fakeServer(exists, {
      url:  '/api/account/exists',
      headers: {
        authorization: token
      },
      method: 'GET',
      query: {
        name: 'Test User',
        email:'email@test.com'
      }
    });

    expect(res.status).toEqual(201);
  });

  test('GET - Not Found', async () => {
    const serverRes = await fakeServer(exists, {
      url:  '/api/account',
      headers: {
        authorization: token
      },
      method: 'GET',
      query: {
        name: 'Does not Exists'
      }
    });
    
    expect(serverRes.status).toEqual(404);
  });
});
