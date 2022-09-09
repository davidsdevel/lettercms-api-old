const {blogs, posts} = require('@lettercms/models')(['blogs', 'posts']);
const fetch = require('node-fetch');
const revalidate = require('@lettercms/utils/lib/revalidate');
const {getFullUrl} = require('@lettercms/utils/lib/posts');

module.exports = async function() {
  const {
    req,
    res
  } = this;

  const {
    subdomain
  } = req;

  const condition = {
    subdomain
  };

  const db = await blogs.findOneAndUpdate(condition, req.body, {select: 'mainUrl url'});

  revalidate(subdomain, prevBase);

  if (req.body.url || req.body.mainUrl) {
    const prevUrlID = db.url;
    const prevBase = db.mainUrl;
    const urlID = req.body.url;
    const base = req.body.mainUrl;

    if (prevBase !== base) {
      revalidate(subdomain, base);
    }

    if (prevUrlID !== urlID) {
      const _posts = await posts.find({subdomain, views: {$gt: 0}, postStatus: 'published'}, 'url published category', {lean: true});

      _posts.forEach(e => {
        let _base = base || prevBase;
        let oldBase = prevBase;

        const url = _base + getFullUrl(e, prevUrlID);
        const newUrl = oldBase + getFullUrl(e, urlID);

        revalidate(subdomain, url);
        revalidate(subdomain, newUrl);
      });
    }
  }
  
  if (db.ok)
    return res.json({
      status: 'OK'
    });


  res.json({
    status:'not-modified'
  });
};