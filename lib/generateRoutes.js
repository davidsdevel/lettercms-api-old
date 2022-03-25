const {lstatSync, readdirSync} = require('fs');
const {join} = require('path');

const base = process.cwd();

const main = readdirSync(join(base));

function generateRoutes() {
  const files = [];
    
  main.forEach(e => {
    const stat = lstatSync(join(base, e));

    if (stat.isDirectory() && e.startsWith('davidsdevel-'))
      files.push(e);
  });

  return files;
}

function readdir(path) {
  const dir = readdirSync(path);
  const names = [];

  dir.forEach(file => {
    const completePath = join(path, file);

    if (lstatSync(completePath).isDirectory())
      names.push(readdir(completePath));
    else
      names.push(completePath);
  });

  return names;
}

function mapRoutes() {
  const dirs = generateRoutes();
  const routes = {}

  dirs.forEach(e => {
    const apiPath = join(base, e, 'api');

    const paths = readdir(apiPath).flat(10);

    const pathFiltered = paths.map(e  => '/' + e.replace('davidsdevel-', 'api/').replace('s\\api', '').replace(/\[/g, ':').replace(/]/g, '').replace(/\\/g, '/').replace('.js', '').replace('/index', ''))

    routes[e.replace('davidsdevel-', '')] = {
      files: paths,
      routes: pathFiltered
    }
  });

  return routes;
}

module.exports = mapRoutes;
