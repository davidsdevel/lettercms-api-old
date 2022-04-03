const sdk = require('../../SDK');
const admin = require('../../../sdk-admin');
const Model = require('../../davidsdevel-accounts/lib/database');

sdk.setAccessToken(ACCESS_TOKEN);

describe('Accounts API Testing', () => {
  test('POST - Create Account', async () => {
    const res = await admin.createAccount({
      name: 'Test User',
      lastname: 'Test LastName',
      verified: true,
      role: 'admin',
      email:'create@test.com',
      password: '1234',
    });


    expect(res).toMatchObject({
      id: /[a-z0-9]{24}/i,
      message: 'OK',
      code: /\n\n\n\n/
    });

    const blogRes = await admin.createBlog({
      subdomain: 'testing',
      title: 'My Blog',
      description: 'Example',
      ownerEmail: 'create@test.com'
    })

    expect(blogRes).toMatchObject({
      id: /[a-z0-9]{24}/i,
      message: 'OK'
    });    
  });

  test('POST - Create Existing Account', async () => {
    const res = await admin.createAccount({
      name: 'Test User',
      lastname: 'Test LastName',
      verified: true,
      role: 'admin',
      email:'existing@test.com',
      password: '1234',
    });


    expect(res).toMatchObject({
      id: /[a-z0-9]{24}/i,
      message: 'OK',
      code: /\n\n\n\n/
    });

    const existingRes = await admin.createAccount({
      name: 'Test User',
      lastname: 'Test LastName',
      verified: true,
      role: 'admin',
      email:'existing@test.com',
      password: '1234',
    });

    expect(existingRes).toEqual({
      code: 'email-exists',
      message: 'Email already exists'
    });
  })

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
          email:'create@test.com'
        }
      ],
      next: false,
      pages: 1
    });
  })

  test('GET - Only Email', async () => {
    const res = await sdk.accounts.all(['email']);

    expect(res).toMatchObject({
      data: [
        {
          _id: /[a-z0-9]{24}/i,
          email:'create@test.com'
        }
      ],
      next: false,
      pages: 1
    });
  });
});
