const {images} = require('@lettercms/models')(['images']);
const {manageMethods} = require('@lettercms/utils');
const {isValidObjectId} = require('mongoose');

const GET = async function() {
  const {req, res, findSingle} = this;

  const {id} = req.query;
  const {subdomain} = req;

  const condition = {
    subdomain
  };

  if (isValidObjectId(id))
    condition._id = id;
  else
    condition.name = id;

  const file = await findSingle(req.query, images, condition);

  res.json(file);
};

module.exports= manageMethods({
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