const cluster = require('cluster');
const {init} = require('./index');

const numCPUs = process.env.WEB_CONCURRENCY || 2;

if (cluster.isMaster) {
  console.log('Master cluster setting up ' + numCPUs + ' workers...');

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('online', worker => console.log('Worker ' + worker.process.pid + ' is online'));

  cluster.on('exit', (worker, code, signal) => {
    console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
    console.log('Starting a new worker');
    cluster.fork();
  });
} else {
  init();
}
