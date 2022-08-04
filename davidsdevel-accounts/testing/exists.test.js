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
const testID = 'exists-account';


describe('Accounts API Testing', () => {
  test('GET - Exists Account', async () => {
    const now = new Date();

    await Accounts.createAccount(testID, {
      name: 'David',
      lastname: 'Gonzalez',
      lastLogin: now,
      email: 'exists-account@test.com',
      password: '1234',
      role: 'admin'
    });

    const nameResponse = await fetch(`http://microservices:3009/api/account/exists?name=David`);
    expect(nameResponse.status).toBe(200);


    const lastnameResponse = await fetch(`http://microservices:3009/api/account/exists?lastname=Gonzalez`);
    expect(lastnameResponse.status).toBe(200);

    const emailResponse = await fetch(`http://microservices:3009/api/account/exists?email=exists-account@test.com`);
    expect(emailResponse.status).toBe(200);

    const subRes = await fetch(`http://microservices:3009/api/account/exists?subdomain=exists-account`);
    expect(subRes.status).toBe(200);

  });

  test('GET - Not Found', async () => {
    const emailResponse = await fetch(`http://microservices:3009/api/account/exists?email=does-not-exists@test.com`);
    expect(emailResponse.status).toBe(404);
  });

  afterAll(async () => {
    await Accounts.deleteMany({
      subdomain: testID
    });

    mongo.close();
  })
})