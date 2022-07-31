const fetch = require('node-fetch');
const mongoose = require('mongoose');
const factory = require('@lettercms/models');

const mongo = mongoose.createConnection('mongodb://localhost/blog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

const {accounts: {Accounts}} = factory(mongo, ['accounts']);
const testID = 'accounts-login';

const baseRequest = {
  headers: {
    Authorization: ACCESS_TOKEN,
    'Content-Type': 'application/json'
  },
  mode: 'cors',
  credentials: 'include'
}

describe('Login API Testing', () => {
  test('POST - Login Sucessfully', async () => {
    await Accounts.createAccount(testID, {
      email: 'login@test.com',
      password: '1234',
      role: 'admin'
    });

    const loginRes = await fetch('http://microservices:3009/api/account/login', {
      ...baseRequest,
      method: 'POST',
      body: JSON.stringify({
        email: 'login@test.com',
        password: '1234'
      })
    });
    expect(loginRes.status).toBe(200);

    const loginJson = await loginRes.json();
    expect(loginJson).toMatchObject({
      id: /[a-z0-9]{24}/i,
      accessToken: /\w*\.\w*\.\w*/i
    });
  });

  test('POST - Invalid Email', async () => {
    const loginRes = await fetch('http://microservices:3009/api/account/login', {
      ...baseRequest,
      method: 'POST',
      body: JSON.stringify({
        email: 'no-email@test.com',
        password: '1234'
      })
    });
    expect(loginRes.status).toBe(200);

    const loginJson = await loginRes.json();
    expect(loginJson).toEqual({
      status: 'no-account',
      message: 'Email does not exists'
    })
  });

  test('POST - Invalid Password', async () => {
    await Accounts.createAccount(testID, {
      email: 'bad-pass@test.com',
      password: '1234',
      role: 'admin'
    });

    const loginRes = await fetch('http://microservices:3009/api/account/login', {
      ...baseRequest,
      method: 'POST',
      body: JSON.stringify({
        email: 'bad-pass@test.com',
        password: 'bad-pass'
      })
    });

    expect(loginRes.status).toBe(200);

    const loginJson = await loginRes.json();

    expect(loginJson).toEqual({
      status: 'invalid-password',
      message: 'Invalid Password'
    });
  });
  test('POST - No Email', async () => {
    const loginRes = await fetch('http://microservices:3009/api/account/login', {
      ...baseRequest,
      method: 'POST',
      body: JSON.stringify({
        password: '1234'
      })
    });

    expect(loginRes.status).toBe(400);

    const loginJson = await loginRes.json();

    expect(loginJson).toEqual({
      status: 'bad-request',
      message: 'Email must be set'
    });
  });
  test('POST - No Password', async () => {
    const loginRes = await fetch('http://microservices:3009/api/account/login', {
      ...baseRequest,
      method: 'POST',
      body: JSON.stringify({
        email: 'login@test.com'
      })
    });

    expect(loginRes.status).toBe(400);

    const loginJson = await loginRes.json();

    expect(loginJson).toEqual({
      status: 'bad-request',
      message: 'Password must be set'
    });
  });
  test('POST - No Data', async () => {
    const loginRes = await fetch('http://microservices:3009/api/account/login', {
      ...baseRequest,
      method: 'POST',
      body: JSON.stringify({})
    });

    expect(loginRes.status).toBe(400);

    const loginJson = await loginRes.json();

    expect(loginJson).toEqual({
      status: 'bad-request',
      message: 'Email must be set'
    });
  });

  afterAll(async () => {
    await Accounts.deleteMany({
      subdomain: testID
    });

    mongo.close();
  })
});
