const jwt = require('jsonwebtoken');
const {checkVerification} = require('../checkFirebase');

describe('Accounts API Testing', () => {
  test('GET - Exists Account', async () => {
    const verifyToken = jwt.sign({
      name: 'LetterCMS Test Name',
      lastname: 'Test LastName',
      email:'exists@test.com',
      password: '1234'
    }, JWT_AUTH);

    const res = await fetch(`http://microservices:3009/api/account/verify?token=${verifyToken}`);
    expect(res.status).toEqual(200);

    const verifyResponse = await res.text();
    expect(verifyResponse).toBe('<html><body><script>window.close()</script></body></html>');

    const verificationStatus = await checkVerification('exists@test.com')

    expect(verificationStatus).toEqual({
      name: 'LetterCMS Test Name',
      email:'exists@test.com',
      status: 'verified'
    });

    const nameResponse = await fetch(`http://microservices:3009/api/account/exists?name=LetterCMS Test Name`);
    expect(nameResponse.status).toBe(200);

    const emailResponse = await fetch(`http://microservices:3009/api/account/exists?email=exists@test.com`);
    expect(emailResponse.status).toBe(200);

  });

  test('GET - Not Found', async () => {
    const emailResponse = await fetch(`http://microservices:3009/api/account/exists?email=does-not-exists@test.com`);
    expect(emailResponse.status).toBe(404);
  });
})