process.env.MONGO_URL = 'mongodb://localhost/test';
process.env.LETTER_ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbWluIjp0cnVlLCJpYXQiOjE2MTY4MjU1MDN9.BlS_E05w8AUhQvsVH0A_T28QC3l3nwqM3e2hP4Qa1RA';
process.env.JWT_AUTH = 'davidsdevel';
process.env.LETTER_TESTING = true;

const connect = require('./utils/lib/connection')

module.exports = async function() {
  await connect();
}