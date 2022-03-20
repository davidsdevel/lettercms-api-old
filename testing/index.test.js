const routes = require('../davidsdevel-accounts/api/index');
const Model = require('../davidsdevel-accounts/lib/database');
const fetch = require('node-fetch');

describe('Accounts API Testing', () => {
  test('Unauthorized', async () => {
    const res = await fetch('http://localhost:3009/api/account')

    expect(res.status).toEqual(401);
  });
});
