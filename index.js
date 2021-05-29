process.env.LETTER_ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbWluIjp0cnVlLCJpYXQiOjE2MTY4MjU1MDN9.BlS_E05w8AUhQvsVH0A_T28QC3l3nwqM3e2hP4Qa1RA'
process.env.JWT_AUTH = 'davidsdevel';

//require('dotenv').config();

const express = require('express');
const app = express();
const {lstatSync, readdirSync} = require('fs');
const {join} = require('path');

const main = readdirSync(__dirname);
const debug = require('debug');
const routerDebug = debug('router');
const queryDebug = debug('query');
const bodyDebug = debug('body');
const debugResponse = debug('response');
const debugServer = debug('server');

const dirs = [];
const routes = {};

main.forEach(e => {
	const stat = lstatSync(join(__dirname, e));

	if (stat.isDirectory() && e.startsWith('davidsdevel-'))
		dirs.push(e);
});

dirs.forEach(e => {	
	if (process.argv.length > 2 && process.argv.indexOf(e.replace('davidsdevel-', '').replace(/s$/, '')) === -1)
		return;

	const apiPath = join(__dirname, e, 'api');

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

	const paths = readdir(apiPath).flat(10);

	const pathFiltered = paths.map(e  => '/' + e.replace('davidsdevel-', 'api/').replace('s\\api', '').replace(/\[/g, ':').replace(/]/g, '').replace(/\\/g, '/').replace('.js', '').replace('/index', ''))

	routes[e.replace('davidsdevel-', '')] = {
		files: paths,
		routes: pathFiltered
	}
});

app
  .use(express.urlencoded({ extended: true }))
	.use(express.json())
	.get('/', (_, res) => res.sendFile(join(__dirname, 'testing.html')))

const apis = Object.keys(routes);

apis.forEach(apiName => {
	
	const api = routes[apiName];

	api.routes.forEach((e, i) => {
		const newRoute = e.replace(/.*davidsdevel-/, '/api/');
		debugServer(newRoute)
		const router = require(join(api.files[i]));

		app.all(newRoute, (req, res, next) => {
			res.old_send = res.send;

			res.send = resp => {
				debugResponse(resp);
				return res.old_send(resp);
			}

			req.query = Object.assign({}, req.query, req.params);

			if (req.method === 'OPTIONS') {

  			res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  			res.header("Access-Control-Allow-Origin", '*'); // update to match the domain you will make the request from
  			res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  			res.header("Access-Control-Allow-Credentials", "true");

				return res.sendStatus(200);
			}

			routerDebug(req.method + ' - ' + req.url);
			bodyDebug(req.body);
			queryDebug(req.query);
			next();
		}, router);
	});
})

module.exports = app;
