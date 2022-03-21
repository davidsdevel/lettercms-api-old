const {manageMethods} = require('C:/Users/pc/Documents/Proyectos/letterCMS/davidsdevel-microservices/utils');
const Model = require('../../lib/database');

const GET = async function() {
  const {req, res} = this;

  const {name, subdomain} = req.query;

  const file = await Model.findOne({name, subdomain}, 'type blob');

  res.header("Content-Type", file.type);

  res.send(file.blob);
}

module.exports= manageMethods(Model, {
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