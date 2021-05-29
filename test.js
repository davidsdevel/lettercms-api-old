process.env.LETTER_ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbWluIjp0cnVlLCJpYXQiOjE2MTY4MjU1MDN9.BlS_E05w8AUhQvsVH0A_T28QC3l3nwqM3e2hP4Qa1RA'
process.env.JWT_AUTH = 'davidsdevel';

const fetch = require('./testing/fetchMiddleware')
const token =  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJkb21haW4iOiJ0ZXN0aW5nIiwiaWF0IjoxNjE0Mjc5MzM5fQ.khqm6uX0O4DtE3XR9yrqTRT3ZukdyxbyfXe1MVXvjVI'


fetch('/api/account', {
  headers: {
    Authorization: token
  }
}).then(r => r.json()).then(console.log)