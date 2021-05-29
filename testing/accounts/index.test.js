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
  test('POST - Create Account', async () => {
    const res = await admin.createAccount({
      name: 'Test User',
      lastname: 'Test LastName',
      verified: true,
      role: 'admin',
      email:'email@test.com',
      password: '1234',
    });

    expect(res).toEqual({
      message: 'OK'
    });
  });

  test('GET - All', async () => {
    const res = await sdk.accounts.all();
    
    expect(res).toMatchObject({
      data: [
        {
          __v: 0,
          _id: /[a-z0-9]{24}/i,
          subdomain: 'testing',
          name: 'Test User',
          lastname: 'Test LastName',
          verified: true,
          role: 'admin',
          email:'email@test.com'
        }
      ],
      next: false,
      pages: 1
    });
  })

  test('GET - Only Email', async () => {
    const res = await sdk.account.all(['email']);

    expect(res).toMatchObject({
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
