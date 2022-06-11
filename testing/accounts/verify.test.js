const fetch = require('node-fetch');
const {checkVerification} = require('../checkFirebase');

const baseRequest = {
  headers: {
    Authorization: ADMIN_TOKEN,
    'Content-Type': 'application/json'
  },
  mode: 'cors',
  credentials: 'include'
}

describe('Accounts Verify Testing', () => {
  test('POST - Verify Account', async () => {
    const verifyToken = jwt.sign({
      name: 'LetterCMS Test Name',
      lastname: 'Test LastName',
      email:'verify@test.com',
      password: '1234'
    }, JWT_AUTH);

    const res = await fetch(`http://microservices:3009/api/account/verify?token=${verifyToken}`);
    expect(res.status).toEqual(200);

    const verifyResponse = await res.text();
    expect(verifyResponse).toBe('<html><body><script>window.close()</script></body></html>');

    const verificationStatus = await checkVerification('verify@test.com');
    expect(verificationStatus).toEqual({
      name: 'LetterCMS Test Name',
      email: 'verify@test.com',
      status: 'verified'
    });
  });

  test('POST - Expired Token', async () => {
    const verifyToken = jwt.sign({
      name: 'LetterCMS Test Name',
      lastname: 'Test LastName',
      email:'expiredtoken@test.com',
      password: '1234'
    }, JWT_AUTH, { expiresIn: 1 });

    const res = await fetch(`http://microservices:3009/api/account/verify?token=${verifyToken}`);
    expect(res.status).toEqual(200);

    const verifyResponse = await res.text();
    expect(verifyResponse).toBe('<html><body><script>window.close()</script></body></html>');

    const verificationStatus = await checkVerification('expiredtoken@test.com');
    expect(verificationStatus).toEqual({
      email: 'expiredtoken@test.com',
      status: 'expired'
    });
  });

  test('POST - Invalid Token', async () => {
    const verifyToken = jwt.sign({
      name: 'LetterCMS Test Name',
      lastname: 'Test LastName',
      email:'invalidtoken@test.com',
      password: '1234'
    }, JWT_AUTH);

    const res = await fetch(`http://microservices:3009/api/account/verify?token=${verifyToken.slice(0)}&e=696e76616c6964746f6b656e40746573742e636f6d`);
    expect(res.status).toEqual(200);

    const verifyResponse = await res.text();
    expect(verifyResponse).toBe('<html><body><script>window.close()</script></body></html>');

    const verificationStatus = await checkVerification('invalidtoken@test.com');
    expect(verificationStatus).toEqual({
      email: 'invalidtoken@test.com',
      status: 'bad-token'
    })
  });

  test('POST - Invalid Signature', async () => {
    const verifyToken = jwt.sign({
      name: 'LetterCMS Test Name',
      lastname: 'Test LastName',
      email:'invalidsignature@test.com',
      password: '1234'
    }, 'bad-signature');

    const res = await fetch(`http://microservices:3009/api/account/verify?token=${verifyToken}&e=696e76616c69647369676e617475726540746573742e636f6d`);
    expect(res.status).toEqual(200);

    const verifyResponse = await res.text();
    expect(verifyResponse).toBe('<html><body><script>window.close()</script></body></html>');

    const verificationStatus = await checkVerification('invalidsignature@test.com');
    expect(verificationStatus).toEqual({
      email: 'invalidsignature@test.com',
      status: 'invalid-signature'
    })
  });

  test('POST - Already verified', async () => {
    const verifyToken = jwt.sign({
      name: 'LetterCMS Test Name',
      lastname: 'Test LastName',
      email:'already-verified@test.com',
      password: '1234'
    }, JWT_AUTH);

    const res = await fetch(`http://microservices:3009/api/account/verify?token=${verifyToken}`);
    expect(res.status).toEqual(200);

    const verifyResponse = await res.text();
    expect(verifyResponse).toBe('<html><body><script>window.close()</script></body></html>');

    const verificationStatus = await checkVerification('already-verified@test.com');
    expect(verificationStatus).toEqual({
      name: 'LetterCMS Test Name',
      email: 'already-verified@test.com',
      status: 'verified'
    });

    const existsRes = await fetch(`http://microservices:3009/api/account/exists?email=already-verified@test.com`);
    expect(existsRes.status).toEqual(200);

    const reverify = await fetch(`http://microservices:3009/api/account/verify?token=${verifyToken}`);
    expect(reverify.status).toEqual(200);
    
    const reverifyJson = await reverify.json();
    expect(reverifyJson).toEqual({
      status: 'aready-exists',
      message: `Account with email "already-verified@test.com" already exists`
    });

    const loginRes = await fetch('http://microservices:3009/api/account/login', {
      ...baseRequest,
      body: JSON.stringify({
        email: 'already-verified@test.com',
        password: '1234'
      })
    });
    expect(loginRes.status).toEqual(200);

    const loginJson = await loginRes.json();
    expect(loginJson).toMatchObject({
      id: /[a-z0-9]{24}/i,
      accessToken: /\w*\.\w*\.\w*/i
    })
  });

  test('POST - Unable to Verify', async () => {
    const verifyToken = jwt.sign({
      name: 'LetterCMS Test Name',
      lastname: 'Test LastName',
      email:'unable-to-verify@test.com',
      password: '1234'
    }, JWT_AUTH);

    const res = await fetch(`http://microservices:3009/api/account/verify?token=${verifyToken}`);
    expect(res.status).toEqual(200);

    const verifyResponse = await res.text();
    expect(verifyResponse).toEqual({
      status: 'unable-to-verify',
      message: 'Email "unable-to-verify@test.com" cannot be verified'
    });
  });

});
