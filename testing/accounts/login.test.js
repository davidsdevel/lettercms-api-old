const sdk = require('../../SDK');
const admin = require('../../../sdk-admin');
const Model = require('../../davidsdevel-accounts/lib/database');

sdk.setAccessToken(ACCESS_TOKEN);

describe('Accounts API Testing', () => {
  test('POST - Login', async () => {
    const accres = await admin.createAccount({
      name: 'Test User',
      lastname: 'Test LastName',
      verified: true,
      role: 'admin',
      email:'login@test.com',
      password: '1234',
    });

    expect(accres).toMatchObject({
      id: /[a-z0-9]{24}/i,
      message: 'OK',
      code: /\n\n\n\n/
    });

    const res = await admin.login('login@test.com', '1234');

    expect(res).toMatchObject({
      id: /[a-z0-9]{24}/i,
      accessToken: /\w*\.\w*\.\w*/i
    })
  });

  test('POST - Does not Exists', async () => {
    const res = await admin.login('noemail@test.com', '1234');

    expect(res).toEqual({
      code: 'no-account',
      message: 'Email does not exists'
    });
  });

  test('POST - Does not Exists', async () => {
    const res = await admin.login('login@test.com', 'bad-pass');

    expect(res).toEqual({
      code: 'invalid-password',
      message: 'Invalid Password'
    });
  });
});
