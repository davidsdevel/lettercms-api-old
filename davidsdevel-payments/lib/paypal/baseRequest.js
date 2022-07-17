
const fetch = require('node-fetch');
const config = require('./config');

module.exports = async () => {
  const body = 'grant_type=client_credentials';

  const res = await fetch(`https://api.${config.environment === 'sandbox' ? 'sandbox.' : ''}paypal.com/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': body.length,
      Authorization: `Basic ${Buffer.from((config.environment === 'sandbox' ? config.sandbox_client_id : config.production_client_id) + ':' + (config.environment === 'sandbox' ? config.sandbox_secret : config.production_secret)).toString('base64')}`
    },
    body
  });

  return res.json();
}

module.exports = async function() {
  try {
    const path = arguments[0];
    const hasMethods = ['GET', 'POST', 'PATCH', 'DELETE'].indexOf(arguments[1]) > -1;
    const method = hasMethods ? arguments[1] : 'GET';
    const opts = hasMethods ? arguments[2] : arguments[1];
    const headers = hasMethods ? arguments[3] : arguments[2];

    const res = await fetch(`https://api.${config.environment === 'sandbox' ? 'sandbox.' : ''}paypal.com/v1/oauth2/token`, {
      method,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': body.length,
        Authorization: `Basic ${Buffer.from((config.environment === 'sandbox' ? config.sandbox_client_id : config.production_client_id) + ':' + (config.environment === 'sandbox' ? config.sandbox_secret : config.production_secret)).toString('base64')}`
      },
      body
    });

    return res.json();

  } catch(err) {
    return Promise.reject(err);
  }
}
