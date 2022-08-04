const {scryptSync, randomBytes} = require('crypto');
const fetch = require('node-fetch');
const mongoose = require('mongoose');
const factory = require('@lettercms/models');
const jwt = require('jsonwebtoken');

const generateSecretHash = key => {

  const salt = randomBytes(8).toString('hex');
  const buffer = scryptSync(key, salt, 64);

  return `${buffer.toString('hex')}.${salt}`;
}

const generateToken = (data, key) => {
  const secret = generateSecretHash(key);
  const hex = Buffer.from(JSON.stringify(data)).toString('hex');

  return `${secret}@${hex}`;
}

const mongo = mongoose.createConnection('mongodb://localhost/blog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

const {accounts: {Accounts}} = factory(mongo, ['accounts']);
const testID = 'accounts-verify';

describe('Verify API Testing', () => {
  test('POST - Verify Data', async () => {

    const token = generateToken({
      name: 'David',
      lastname: 'Gonzalez',
      email: 'verify@test.com',
      password: '1234',
      code: '1234'
    }, JWT_AUTH);

    const verifyRes = await fetch('http://microservices:3009/api/account/verify', {
      headers: {
        Authorization: jwt.sign({subdomain: testID}, JWT_AUTH),
        'Content-Type': 'application/json'
      }
    });
    expect(verifyRes.status).toBe(200);

    const verifyJson = await verifyRes.json();
    expect(verifyJson).toMatchObject({
      status: 'OK'
    });
    const acc = await Accounts.findOne({email: 'verify@test.com'}, null, {lean: true});

    expect(acc).toMatchObject({
      _id:/[a-z0-9]{12,24}/,
      __v: 0,
      name: 'David',
      lastname: 'Gonzalez',
      email: 'verify@test.com',
      password: /\$2b\$10\$(\w|\.|\/){53}/i,
      subdomain: testID,
      firstTime: true,
      isSubscribeToNewsletter: false
    });
  });
  test('POST - Existing Data', async () => {
    const token = generateToken({
      name: 'David',
      lastname: 'Gonzalez',
      email: 'verify@test.com',
      password: '1234',
      code: '1234'
    }, JWT_AUTH);

    const verifyRes = await fetch('http://microservices:3009/api/account/verify', {
      headers: {
        Authorization: jwt.sign({subdomain: testID}, JWT_AUTH),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token
      })
    });
    expect(verifyRes.status).toBe(200);

    const verifyJson = await verifyRes.json();
    expect(verifyJson).toMatchObject({
        status: 'aready-exists',
        message: `Account with email "verify@test.com" already exists`
      });
  });
  test('POST - Verify Data', async () => {

    const token = generateToken({
      name: 'David',
      lastname: 'Gonzalez',
      email: 'verify@test.com',
      password: '1234',
      code: '1234'
    }, JWT_AUTH);

    const verifyRes = await fetch('http://microservices:3009/api/account/verify', {
      headers: {
        Authorization: jwt.sign({subdomain: testID}, JWT_AUTH),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token
      })
    });
    expect(verifyRes.status).toBe(200);

    const verifyJson = await verifyRes.json();
    expect(verifyJson).toMatchObject({
      status: 'OK'
    });
    const acc = await Accounts.findOne({email: 'verify@test.com'}, null, {lean: true});

    expect(acc).toMatchObject({
      _id:/[a-z0-9]{12,24}/,
      __v: 0,
      name: 'David',
      lastname: 'Gonzalez',
      email: 'verify@test.com',
      password: /\$2b\$10\$(\w|\.|\/){53}/i,
      subdomain: testID,
      firstTime: true,
      isSubscribeToNewsletter: false
    });
  });
  test('POST - Bad Request', async () => {

    const verifyRes = await fetch('http://microservices:3009/api/account/verify', {
      headers: {
        Authorization: jwt.sign({subdomain: testID}, JWT_AUTH),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        noToken: 'hola mundo'
      })
    });
    expect(verifyRes.status).toBe(400);

    const verifyJson = await verifyRes.json();
    expect(verifyJson).toMatchObject({
      status: 'bad-request',
      message: 'You must set a valid code'
    });
  });
  test('POST - Bad Request', async () => {

    const verifyRes = await fetch('http://microservices:3009/api/account/verify', {
      headers: {
        Authorization: jwt.sign({subdomain: testID}, JWT_AUTH),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: 'hola@mundo'
      })
    });
    expect(verifyRes.status).toBe(200);

    const verifyJson = await verifyRes.json();
    expect(verifyJson).toMatchObject({
      status: 'invalid-token'
    });
  });
  afterAll(async () => {
    await Accounts.deleteMany({
      subdomain: testID
    });

    mongo.close();
  })
});
