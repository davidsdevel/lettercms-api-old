const fetch = require('node-fetch')

module.exports = async (url, method, data) => {
  const isGet = method === 'GET';

  let query = '';

  let newData = {};

  if (isGet && !!data) {
    if (Array.isArray(data))
      newData = {
        fields: data.join(',')
      };
    else {
      if (data.fields)
        newData.fields = data.fields.join(',')
    }

    query = toQuery(newData);
  } 


  if (!isGet)
    headers['Content-Type'] = 'application/json';

  try {
    const pathSplitted = path.split('/');
    const endpoint = this.endpoints[pathSplitted[1]];

    const res = await fetch(`${url}${query}`, {
      method,
      headers,
      body: !isGet && !!data ? JSON.stringify(data) : undefined
    });

    const resData = await res.json();

    return Promise.resolve(resData);
  } catch(err) {
    return Promise.reject(err);
  }
} 