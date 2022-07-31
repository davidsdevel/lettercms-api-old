const {images, usage} = require('@lettercms/models')(['images', 'usage']);
const {manageMethods} = require('@lettercms/utils');

const POST = async function() {
  const {req, res} = this;

  const {subdomain, path} = req;
  const {url, name: reqName, size} = req.body;

  let name = reqName;

  if (!reqName) {
    const urlSplitted = url.split('%2F');

    name = urlSplitted[urlSplitted.lenght - 1].split('?')[0];
  }

  const {_id} = await images.create({
    url,
    subdomain,
    thumbnail: url,
    name
  });

  await usage.updateOne({subdomain}, {$inc: {storageSize: -size * 1024}});

  res.json({
    status: 'OK',
    url,
    thumbnail: url,
    size,
    _id
  });
};

const GET = async function() {
  const {req, res, find} = this;

  const {subdomain, path} = req; 

  const data = await find({
    ...req.query,
    path
  }, images, {subdomain});

  res.json(data);
};

module.exports = manageMethods({
  POST,
  GET
});


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