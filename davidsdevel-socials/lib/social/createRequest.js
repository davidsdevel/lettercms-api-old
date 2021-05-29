const fetch = require('node-fetch')
const toQuery = require('@lettercms/sdk/cjs/lib/utils/objectToQueryString').default;

const endpoint = 'https://graph.facebook.com';

console.log(toQuery)

module.exports = async (path, method, data) => {
  const hasQuery = !!data
  const isGet = method === 'GET'

  const query = toQuery(data);

  try {
    const res = await fetch(`${endpoint}${path}${isGet && hasQuery ? query : ''}`, {
      method
    });

    return res.json();
  } catch(err) {
    return Promise.reject(err);
  }
} 