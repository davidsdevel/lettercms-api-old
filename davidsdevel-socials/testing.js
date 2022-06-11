const express = require('express');
const {join} = require('path');

const app = express();

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'test.html'));
});

app.listen(3000, () => console.log('Listen'));