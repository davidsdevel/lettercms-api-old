const sdk = require('../../SDK');
const Model = require('../../davidsdevel-accounts/lib/database');
const admin = require('C:/Users/pc/Documents/Proyectos/letterCMS/sdk-admin');
const {connection} = require('@lettercms/utils')

sdk.setAccessToken(ACCESS_TOKEN);

afterAll(async () => {
  await connection.connect();

  await Model.Accounts.deleteMany({});

  await connection.disconnect();
});

describe('Accounts API Testing', () => {
  test('GET - Exists Account', async () => {
    await admin.createAccount({
      name: 'Test User',
      lastname: 'Test LastName',
      verified: true,
      role: 'admin',
      email:'email@test.com',
      password: '1234',
    });

    const res = await sdk.Letter.existsAccount({
      name: 'Test User',
      email:'email@test.com'
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
