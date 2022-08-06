module.exports = {
  testEnvironment: 'node',
  testEnvironmentOptions: {
    ACCESS_TOKEN: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbWluIjp0cnVlLCJpYXQiOjE2MTY4MjU1MDN9.BlS_E05w8AUhQvsVH0A_T28QC3l3nwqM3e2hP4Qa1RA',
    JWT_AUTH: 'davidsdevel'
  },
  testTimeout: 10000,
  testMatch: [
  '**/davidsdevel-*/testing/me.test.js',
  '**/davidsdevel-*/testing/login.test.js',
  '**/davidsdevel-*/testing/exists.test.js',
  '**/davidsdevel-*/testing/account.test.js'
  ],
  setupFiles: ['./jestInit.js']
};
