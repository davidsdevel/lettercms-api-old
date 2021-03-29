const {fakeServer} = require('./utils');
const {join} = require('path')

const base = process.cwd();

async function fetch(url, options) {
  const splitted = url.split('/api/');
  const routerPath = join(base, `davidsdevel-${splitted[0].replace(/\/.*$/, '')}`);

  const router = require(routerPath);

  const res = await fakeServer(router, {
    url,
    ...options,
    body: options.body ? JSON.parse(options.body) : undefined
  });

  return {
    ...res,
    response: undefined,
    ok: res.status >= 200 && res.status < 400,
    json: () => Promise.resolve(res.response),
    text: () => Promise.resolve(res.response)
  }
}