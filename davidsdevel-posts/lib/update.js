const {posts, pages, blogs} = require('@lettercms/models')(['pages', 'posts', 'blogs']);
const {isValidObjectId} = require('mongoose');
const revalidate = require('@lettercms/utils/lib/revalidate');
const {getFullUrl} = require('@lettercms/utils/lib/posts');


module.exports = async function() {
  const {req, res} = this;

  const {url} = req.query;
  const {subdomain, body} = req;

  const isId = isValidObjectId(url);

  const updateCondition = {};

  if (isId)
    updateCondition._id = url;
  else {
    updateCondition.url = url;
    updateCondition.subdomain = subdomain;
  }

  if (body.url) {
    const existsPage = await pages.exists({subdomain, url: req.body.url});

    if (existsPage)
      return res.status(400).json({
        status: 'posts/url-mismatch',
        message: 'A page with same URL already exists'
      });

    const existsPost = await posts.exists({subdomain, url: req.body.url, postStatus: 'published'});

    if (existsPost)
      return res.status(400).json({
        status: 'posts/url-mismatch',
        message: 'A post with same URL already exists'
      });
  }

  if (body.content)
    body.text = body.content.split('<').map(e => e.split('>')[1]).join('');

  const date = new Date();

  const newData = {
    ...body,
    updated: date
  };

  const updatedPost = await posts.findOneAndUpdate(updateCondition, newData, {select: 'url postStatus category published'});

  if (postStatus === 'published') {
    blogs.findOne({subdomain}, 'mainUrl url', {lean: true})
      .then(({mainUrl, url: urlID}) => {
        const url = mainUrl + getFullUrl(updatedPost, urlID);
        revalidate(subdomain, url);
      });
  }

  res.json({
    status: 'OK',
    id: postID
  });
};