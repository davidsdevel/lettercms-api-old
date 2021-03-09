const index = require('../../davidsdevel-accounts/api/index');
const login = require('../../davidsdevel-accounts/api/login');
const Model = require('../../davidsdevel-accounts/lib/database');
const {fakeServer} = require('../utils');
const {connection} = require('@lettercms/utils');
const mongoose = require('mongoose');

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
  test('POST - Login', async () => {
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

    const serverRes = await fakeServer(routes, {
      url:  '/api/account/login',
      headers: {
        authorization: token
      },
      method: 'POST',
      body: {
        email: 'email@test.com',
        password: '1234'
      }
    });

    
  });

  test('POST - Does not Exists', async () => {
    const serverRes = await fakeServer(routes, {
      url:  '/api/account/login',
      headers: {
        authorization: token
      },
      method: 'POST',
      body: {
        email: 'email@test.com',
        password: '1234'
      }
    });
    expect(serverRes.response).toMatchObject({
      data: [
        {
          _id: /[a-z0-9]{24}/i,
          email:'email@test.com'
        }
      ],
      next: false,
      pages: 1
    });
  });
});
