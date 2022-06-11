const app = require('./index');

const PORT = process.env.PORT || 3009;

/*if (process.env.NODE_ENV !== 'production') {
  https.createServer({
    cert: fs.readFileSync('./cert.pem'),
    key: fs.readFileSync('./key.pem')
  }, app).listen(PORT, () => console.log(`Listen on HTTPS`))
}
else*/
  app.listen(PORT, () => console.log('Listen'));
