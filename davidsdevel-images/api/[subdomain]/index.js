const {manageMethods} = require('@lettercms/utils');
const {images} = require('@lettercms/models');
const formidable = require('formidable');
const fs = require('fs');

const isDev = process.env.NODE_ENV !== 'production'

const POST = async function() {
  const {req, res} = this;

  const form = formidable({ multiples: true });

  form.parse(req, async (err, fields, {file}) => {
    const name = fields.name || file.name;

    const url = `${isDev ? 'http://localhost:3009' : 'https://lettercms-api-staging.herokuapp.com'}/api/image/davidsdevel/${name}`;

    const blob = fs.readFileSync(file.path);

    const {_id} = await images.create({
      url,
      subdomain: 'davidsdevel',
      type: file.type,
      blob,
      thumbnail: url,
      name
    });

    res.json({
      status: 'OK',
      url,
      thumbnail: url,
      _id
    });
  });
}

const GET = async function() {
  const {req, res} = this;

  const {subdomain} = req.query; 

  const data = await images.find({subdomain}, 'url thumbnail');

  res.json(data);
}

module.exports= manageMethods({
  POST,
  GET
})


//module.exports = (_, res) => res.send('Hello World')

/*const firebase = require('firebase-admin');
const init = require('../../lib/initFirebase');

const storage = firebase.storage().ref();

module.exports = async (req, res) => {
  try {
    if (req.method === 'GET') {
      const {
        subdomain,
        limit,
        pageToken
      } = req.query;

      const child = storage.child(subdomain);

      let images;

      if (limit) {
        const imagePaginator = {
          maxResults: limit
        };

        if (pageToken)
          imagePaginator.pageToken = pageToken;

        const list = await child.list(imagePaginator);

        images = list.items;
      } else {
        const list = await child.listAll();

        images = list.items;
      }
    }
  } catch(err) {
    res.sendStatus(500);
    throw new Error(err);
  }
}
*/