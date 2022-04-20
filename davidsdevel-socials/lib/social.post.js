const {socials} = require('@lettercms/models');
const {Facebook, Instagram} = require('./social');

module.exports = async function() {
  const {req, res} = this;

  const {subdomain} = req;
  const {social} = req.query;

  const {feed, message, images} = req.body;

  console.log(req.body)

  const hasIg = feed === 'instagram';

  if (hasIg && !images && images.length !== 1) 
    return res.json({
      message: ' Instagram must have (1) image'
    });


  if (social === 'facebook') {
    const {token, pageId} = await socials.Facebook.findOne({
      subdomain
    }, 'pageId token');

    const fb = new Facebook(pageId, token);
    try {

    const data = await fb.publishPost(message, req.body);
    console.log(data)
    } catch(err) {
      console.log(err);
      return res.status(500).send(err);
    }
  }

  if (hasIg) {
    /*const {token, userId} = await socials.Instagram.findOne({
      subdomain
    }, null, 'userId token');*/

    const userId = '17841405843756074';
    const token = 'EAAEytdOWWx0BALqsuAeIqjn8boSQXVnU1tWbYKR49nd9ZBtN8JjpayqmKykiZCcJBXZBbOiVp5HULbjOQYrA6dfFiUvOygJllqB1JsJxBjNXnsdieYgbZB4j8megS8qKqMI8AG1kNegBd1NBgPPBunpZB9TjFxE7MRbG549c9xgZDZD';

    const ig = new Instagram(userId, token);

    await ig.publishPost(message, images[0]);
  }

  res.json({status: 'OK'})
}