const generateRoutes = require('./lib/generateRoutes');
const mapR = require('./lib/mapUrl');
const {appendFile} = require('fs');

const routesPath = generateRoutes();
const routes = mapR(routesPath);


const mapped = Object.values(routes).flat().map(e => {
  e.file = e.file.replace(/.*path0/, '');

  return e;
}).sort(e => e.url.includes(':') ? +1 : -1);
console.log(mapped)

appendFile('./manifest.json', JSON.stringify(mapped), err => {
  if (err)
    throw err;

  console.log('Done');
});

