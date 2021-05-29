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
  test('POST - Login', async () => {
    await admin.createAccount({
      name: 'Test User',
      lastname: 'Test LastName',
      verified: true,
      role: 'admin',
      email:'email@test.com',
      password: '1234',
    });

    const res = await admin.login('email@test.com', '1234');

    expect(res).toMatchObject({
      id: /[a-z0-9]{24}/i,
      accessToken: /\w*\.\w*\.\w*/i
    })
  });

  test('POST - Does not Exists', async () => {
    const res = await admin.login('noemail@test.com', '1234');

    expect(serverRes.response).toEqual({
      code: 'no-account',
      message: 'Email does not exists'
    });
  });

  test('POST - Does not Exists', async () => {
    const res = await admin.login('email@test.com', 'bad-pass');

    expect(serverRes.response).toEqual({
      code: 'invalid-password',
      message: 'Invalid Password'
    });
  });
});
