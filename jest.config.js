module.exports = {
  testEnvironment: 'node',
  testEnvironmentOptions: {
    ACCESS_TOKEN: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJkb21haW4iOiJ0ZXN0aW5nIiwiaWF0IjoxNjE0Mjc5MzM5fQ.khqm6uX0O4DtE3XR9yrqTRT3ZukdyxbyfXe1MVXvjVI',
    require: url => {
      if (/fetch/.test(url))
        return require('./testing/fetchMiddleware');
      
      return require(url);
    }
  },
  testTimeout: 10000,
  testMatch: ['**/*.test.js'],
  setupFiles: ['./jestInit.js']
};
