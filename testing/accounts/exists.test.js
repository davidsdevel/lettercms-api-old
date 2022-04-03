const sdk = require('../../SDK');
const admin = require('../../../sdk-admin');
const Model = require('../../davidsdevel-accounts/lib/database');

sdk.setAccessToken(ACCESS_TOKEN);

describe('Accounts API Testing', () => {
  test('GET - Exists Account', async () => {
    await admin.createAccount({
      name: 'Test User',
      lastname: 'Test LastName',
      verified: true,
      role: 'admin',
      email:'exists@test.com',
      password: '1234',
    });

    const res = await sdk.Letter.existsAccount({
      name: 'Test User',
      email:'exists@test.com'
    });

    expect(res).toEqual(true);
  });

  test('GET - Not Found', async () => {
    const res = await sdk.Letter.existsAccount({
      name: 'No User'
    });
    
    expect(res).toEqual(false);
  });
});
