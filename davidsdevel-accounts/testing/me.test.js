const fetch = require('node-fetch');
const mongoose = require('mongoose');
const factory = require('@lettercms/models');
const jwt = require('jsonwebtoken');

const mongo = mongoose.createConnection('mongodb://localhost/blog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

const {accounts: {Accounts}} = factory(mongo, ['accounts']);
const testID = 'accounts-me';

const generatePromise = async (key, value, headers) => {
  const r = await fetch(`http://microservices:3009/api/account/me?fields=${key}`, headers)
  expect(r.status).toBe(200);

  const data = await r.json();

  expect(data).toMatchObject({
    [key]: value,
    _id: /[a-z0-9]{12,24}/i
  });

  return Promise.resolve();
}

describe('Me API Testing', () => {
  test('GET - Complete Data', async () => {
    const now = new Date();
    const {id} = await Accounts.createAccount(testID, {
      name: 'David',
      lastname: 'Gonzalez',
      lastLogin: now,
      description: 'Test description',
      ocupation: 'developer',
      permissions: ['posts'],
      photo: 'photo-url',
      website: 'website-url',
      facebook: 'facebook-url',
      twitter: 'twitter-url',
      instagram: 'instagram-url',
      linkedin: 'linkedin-url',
      email: 'login-me@test.com',
      password: '1234',
      role: 'admin'
    });

    const loginRes = await fetch('http://microservices:3009/api/account/me', {
      headers: {
        Authorization: jwt.sign({subdomain: testID, account: id}, JWT_AUTH),
        'Content-Type': 'application/json'
      }
    });
    expect(loginRes.status).toBe(200);

    const loginJson = await loginRes.json();
    expect(loginJson).toMatchObject({
      name: 'David',
      lastname: 'Gonzalez',
      lastLogin: now.toISOString(),
      description: 'Test description',
      ocupation: 'developer',
      permissions: ['posts'],
      photo: 'photo-url',
      website: 'website-url',
      facebook: 'facebook-url',
      twitter: 'twitter-url',
      instagram: 'instagram-url',
      linkedin: 'linkedin-url',
      email: 'login-me@test.com',
      role: 'admin',
      _id: /[a-z0-9]{12,24}/,
      __v: 0
    });
  });
  test('GET - Fields Data', async () => {
    const now = new Date();
    const {id} = await Accounts.createAccount(testID, {
      name: 'David',
      lastname: 'Gonzalez',
      lastLogin: now,
      description: 'Test description',
      ocupation: 'developer',
      permissions: ['posts'],
      photo: 'photo-url',
      website: 'website-url',
      facebook: 'facebook-url',
      twitter: 'twitter-url',
      instagram: 'instagram-url',
      linkedin: 'linkedin-url',
      email: 'me-fields@test.com',
      password: '1234',
      role: 'admin'
    });

    const token = jwt.sign({subdomain: testID, account: id}, JWT_AUTH);
    const headers = {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json'
      }
    }

    const promises = [
      generatePromise('name',  'David', headers),
      generatePromise('lastname',  'Gonzalez', headers),
      generatePromise('lastLogin',  now.toISOString(), headers),
      generatePromise('description',  'Test description', headers),
      generatePromise('ocupation',  'developer', headers),
      generatePromise('permissions',  ['posts'], headers),
      generatePromise('photo',  'photo-url', headers),
      generatePromise('website',  'website-url', headers),
      generatePromise('facebook',  'facebook-url', headers),
      generatePromise('twitter',  'twitter-url', headers),
      generatePromise('instagram',  'instagram-url', headers),
      generatePromise('linkedin',  'linkedin-url', headers),
      generatePromise('email',  'me-fields@test.com', headers),
      generatePromise('role',  'admin', headers)
    ];

    await Promise.all(promises);
  });

  afterAll(async () => {
    await Accounts.deleteMany({
      subdomain: testID
    });

    mongo.close();
  })
});
