const {Facebook, Instagram} = require('./social');

module.exports = async function() {
  const {req, res, Model} = this;

  const {subdomain} = req;

  const {feeds, message, images} = req.body;

  const hasIg = feeds.indexOf('instagram') > -1

  if (hasIg && !images && images.length !== 1) 
    return res.json({
      message: ' Instagram must have (1) image'
    });


  if (feeds.indexOf('facebook') > -1) {
    /*const {token, pageId} = await Model.Facebook.findOne({
      subdomain
    }, null, 'pageId token');*/
    const pageId = '552760701890501';
    const token = 'EAAEytdOWWx0BAJzdRFJsVr8DiMe5aPwEFP0BShHcoxVsLCJVj6xbcjbaSmelESGIZBmzO7fwtus8rfHoLZCQwp5uet7kAsGeXJyZBnN0JkkcLm0ZArShoPZBUWHdZBREEGqpWg1wQtdYY9gJi0ixYLzDLgaLAsI5whexZAbT0RUcQZDZD';

    const fb = new Facebook(pageId, token);

    await fb.publishPost(message, req.body);
  }

  if (hasIg) {
    const userId = '17841405843756074';
    const token = 'EAAEytdOWWx0BALqsuAeIqjn8boSQXVnU1tWbYKR49nd9ZBtN8JjpayqmKykiZCcJBXZBbOiVp5HULbjOQYrA6dfFiUvOygJllqB1JsJxBjNXnsdieYgbZB4j8megS8qKqMI8AG1kNegBd1NBgPPBunpZB9TjFxE7MRbG549c9xgZDZD';

    /*const {token, userId} = await Model.Instagram.findOne({
      subdomain
    }, null, 'userId token');*/

    const ig = new Instagram(userId, token);

    await ig.publishPost(message, images[0]);
  }
}