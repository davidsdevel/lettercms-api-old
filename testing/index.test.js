const routes = require('../davidsdevel-accounts/api/index');
const Model = require('../davidsdevel-accounts/lib/database');
const {fakeServer} = require('./utils');
const mongoose = require('mongoose');
const {connection} = require('@lettercms/utils');

const token = ACCESS_TOKEN;

/*const sdk = require('../../SDK/test');
sdk.setAPIKey(token);*/

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
  test('Unauthorized', async () => {
    const res = await fakeServer(routes, {
      url:  '/api/account',
      method: 'GET'
    });

    expect(res.status).toEqual(401);
  });
});
