module.exports = async function() {
  const {req, res, Model} = this;

  const {subdomain} = req;

  const {feeds} = req.query;

  const feeds

  if (feeds.indexOf('facebook') > -1) {
    const {token, id} = await Model.Facebook.findOne({
      subdomain
    }, 'pageId token');

    const fb = new FBApi(token);

  }


}