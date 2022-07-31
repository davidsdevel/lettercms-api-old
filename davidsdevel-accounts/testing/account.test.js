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
const testID = 'accounts-account';
const token = jwt.sign({subdomain: testID}, JWT_AUTH);

const generatePromise = async (key, value, id, headers) => {
  const r = await fetch(`http://microservices:3009/api/account/${id}?fields=${key}`, headers)
  expect(r.status).toBe(200);

  const data = await r.json();

  expect(data).toMatchObject({
    [key]: value,
    _id: /[a-z0-9]{12,24}/i
  });

  return Promise.resolve();
}

describe('Account API Testing', () => {
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
      email: 'account@test.com',
      password: '1234',
      role: 'admin'
    });

    const header = {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json'
      }
    };

    const matchObj = {
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
      email: 'account@test.com',
      role: 'admin',
      _id: /[a-z0-9]{12,24}/,
      __v: 0
    }

    const idRes = await fetch(`http://microservices:3009/api/account/${id}`, header);
    expect(idRes.status).toBe(200);

    const idJson = await idRes.json();
    expect(idJson).toMatchObject(matchObj);

    const emailHex = Buffer.from('account@test.com').toString('hex')

    const emailRes = await fetch(`http://microservices:3009/api/account/${emailHex}`, header);
    expect(emailRes.status).toBe(200);

    const emailJson = await emailRes.json();
    expect(emailJson).toMatchObject(matchObj);
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
      email: 'account-fields@test.com',
      password: '1234',
      role: 'admin'
    });

    const headers = {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json'
      }
    }

    const promises = [
      generatePromise('name',  'David', id, headers),
      generatePromise('lastname',  'Gonzalez', id, headers),
      generatePromise('lastLogin',  now.toISOString(), id, headers),
      generatePromise('description',  'Test description', id, headers),
      generatePromise('ocupation',  'developer', id, headers),
      generatePromise('permissions',  ['posts'], id, headers),
      generatePromise('photo',  'photo-url', id, headers),
      generatePromise('website',  'website-url', id, headers),
      generatePromise('facebook',  'facebook-url', id, headers),
      generatePromise('twitter',  'twitter-url', id, headers),
      generatePromise('instagram',  'instagram-url', id, headers),
      generatePromise('linkedin',  'linkedin-url', id, headers),
      generatePromise('email',  'account-fields@test.com', id, headers),
      generatePromise('role',  'admin', id, headers)
    ];

    await Promise.all(promises);
  });
  test('GET - Not Found', async () => {
    const header = {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json'
      }
    }

    const idRes = await fetch(`http://microservices:3009/api/account/some-id`, header);
    expect(idRes.status).toBe(404);

    const idJson = await idRes.json();
    expect(idJson).toMatchObject({
      status: 'not-found',
      message:'Account does not exists'
    });

  })
  test('PATCH - Data', async () => {
    const {id} = await Accounts.createAccount(testID, {
      name: 'David',
      lastname: 'Gonzalez',
      email: 'account-patch@test.com',
      password: '1234',
      role: 'admin'
    });

    const header = {
      method: 'PATCH',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json'
      }
    }

    const addData = await fetch(`http://microservices:3009/api/account/${id}`, {
      ...header,
      body: JSON.stringify({
        ocupation: 'developer'
      })
    });
    expect(addData.status).toBe(200);

    const addDataJson = await addData.json();
    expect(addDataJson).toMatchObject({
      status: 'OK'
    });
    
    const add = await Accounts.findOne({_id: id});
    expect(add).toMatchObject({
      name: 'David',
      lastname: 'Gonzalez',
      email: 'account-patch@test.com',
      ocupation: 'developer',
      password: '1234',
      role: 'admin',
      __v: 0,
      _id: /[a-z0-9]{12,24}/
    });

    const patchData = await fetch(`http://microservices:3009/api/account/${id}`, {
      ...header,
      body: JSON.stringify({
        name: 'Juan'
      })
    });
    expect(patchData.status).toBe(200);

    const patchDataJson = await patchData.json();
    expect(patchDataJson).toMatchObject({
      status: 'OK'
    });

    const patch = await Accounts.findOne({_id: id});
    expect(patch).toMatchObject({
      name: 'Juan',
      lastname: 'Gonzalez',
      email: 'account-patch@test.com',
      ocupation: 'developer',
      password: '1234',
      role: 'admin',
      __v: 0,
      _id: /[a-z0-9]{12,24}/
    });
  })

  afterAll(async () => {
    await Accounts.deleteMany({
      subdomain: testID
    });

    mongo.close();
  })
});
