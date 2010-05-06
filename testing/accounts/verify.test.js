const sdk = require('../../SDK');
const admin = require('C:/Users/pc/Documents/Proyectos/letterCMS/sdk-admin');

sdk.setAccessToken(ACCESS_TOKEN);

describe('Accounts Verify Testing', () => {
  test('POST - Verify Account', async () => {
    const accres = await admin.createAccount({
      name: 'Test User',
      lastname: 'Test LastName',
      role: 'admin',
      email:'verify@test.com',
      password: '1234',
    });

    expect(accres).toMatchObject({
      id: /[a-z0-9]{24}/i,
      message: 'OK',
      code: /\n\n\n\n/
    });

    const res = await admin.verifyAccount('verify@test.com', accres.code);

    expect(res).toEqual({
      message: 'OK'
    });
  });

  test('POST - Bad Code', async () => {
    const accres = await admin.createAccount({
      name: 'Test User',
      lastname: 'Test LastName',
      role: 'admin',
      email:'bad-verify@test.com',
      password: '1234',
    });

    const res = await admin.verifyAccount('bad-verify@test.com', '12345');
    
    expect(res).toEqual({
      status: 'verification-code-mismatch',
      message: 'Wrong verification code'
    });
  });

  test('POST - Already verified', async () => {
    const res = await admin.verifyAccount('verify@test.com', '1234');
    
    expect(res).toEqual({
      status: 'already-verified',
      message: 'Account is already verified'
    });
  });

  test('POST - No Email', async () => {
    const res = await admin.verifyAccount('no-verify@test.com', '1234');
    
    expect(res).toEqual({
      status: 'no-email',
      message: 'Email was not found'
    });
  });

});
