const fetch = require('node-fetch');
const {checkVerification} = require('../checkFirebase')

const baseRequest = {
  headers: {
    Authorization: ADMIN_TOKEN,
    'Content-Type': 'application/json'
  },
  mode: 'cors',
  credentials: 'include'
}

describe('Accounts API Testing', () => {
  test('POST - Login', async () => {
    
    const verifyToken = jwt.sign({
      name: 'Test Name',
      lastname: 'Test LastName',
      email:'login@test.com',
      password: '1234'
    }, JWT_AUTH);

    const res = await fetch(`http://microservices:3009/api/account/verify?token=${verifyToken}`);
    expect(res.status).toEqual(200);

    const verifyResponse = await res.text();
    expect(verifyResponse).toBe('<html><body><script>window.close()</script></body></html>');

    const loginVerification = await checkVerification('login@test.com')

    expect(loginVerification).toMatchObject({
      name: 'Test User',
      email:'exists@test.com',
      status: 'verified'
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

  test('POST - Does not Exists', async () => {
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
      code: 'no-account',
      message: 'Email does not exists'
    })
  });

  test('POST - Invalid Password', async () => {
    const loginRes = await fetch('http://microservices:3009/api/account/login', {
      ...baseRequest,
      method: 'POST',
      body: JSON.stringify({
        email: 'login@test.com',
        password: 'bad-pass'
      })
    });

    expect(loginRes.status).toBe(200);

    const loginJson = await loginRes.json();

    expect(loginJson).toEqual({
      code: 'no-account',
      message: 'Email does not exists'
    })
  });
});
