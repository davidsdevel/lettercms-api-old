const {fakeServer} = require('./utils');
const {join} = require('path')

const base = process.cwd();

async function fetch(url, options = {}) {
  const splitted = url.split('/api/');

  const routerPath = join(base, `davidsdevel-${splitted[1].replace('/', 's/api/').replace(/\?.*$/, '')}`);
  const query = {};

  const querySplitted = url.split('?');
  
  if (querySplitted[1]) {

    querySplitted[1].split('&').forEach(e => {
      const splitted = e.split('=');
      const name = splitted[0];
      const value = splitted[1];
    
      query[name] = value
    });
  }

  const router = require(routerPath);

  const res = await fakeServer(router, {
    ...options,
    url,
    query,
    body: options.body ? JSON.parse(options.body) : {}
  });

  console.log(res)

  const r = res.response;
  delete res.response;

  return Promise.resolve({
    ...res,
    ok: res.status >= 200 && res.status < 400,
    json: () => Promise.resolve(r),
    text: () => Promise.resolve(r)
  });
}

module.exports = fetch;
