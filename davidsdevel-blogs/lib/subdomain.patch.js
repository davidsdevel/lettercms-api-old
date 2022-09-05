const {blogs, posts} = require('@lettercms/models')(['blogs', 'posts']);
const fetch = require('node-fetch');

const getFullUrl = (post, urlID) => {
  if (urlID == '1')
    return `/${post.url}`;

  if (urlID == '2')
    return `/${post.category}/${post.url}`;

  const year = post.published.getFullYear();
  const month = post.published.getMonth() + 1;

  if (urlID == '3')
    return `/${year}/${month}/${url}`;

  const date = post.published.getDate();

  return `/${year}/${month}/${date}/${post.url}`;
};

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

  if (req.body.url || req.body.mainUrl) {
    const prevUrlID = db.url;
    const prevBase = db.mainUrl;
    const urlID = req.body.url;
    const base = req.body.mainUrl;

    fetch(`https://${subdomain}.lettercms.vercel.app/api/revalidate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      body: JSON.stringify({
        path: `/_blogs/${subdomain}${prevBase}` 
      })
    });
    if (base) {
      fetch(`https://${subdomain}.lettercms.vercel.app/api/revalidate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify({
          path: `/_blogs/${subdomain}${base}` 
        })
      });
    }


    const _posts = await posts.find({subdomain, views: {$gt: 0}, postStatus: 'published'}, 'url published category', {lean: true});

    _posts.forEach(e => {
      let _base = base || prevBase;
      let oldBase = prevBase;

      const url = _base + getFullUrl(e, prevUrlID);
      const newUrl = oldBase + getFullUrl(e, urlID);


      fetch(`https://${subdomain}.lettercms.vercel.app/api/revalidate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify({
          path: `/_blogs/${subdomain}${url}` 
        })
      });
      fetch(`https://${subdomain}.lettercms.vercel.app/api/revalidate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify({
          path: `/_blogs/${subdomain}${newUrl}` 
        })
      });
    })

  }


  if (db.ok)
    return res.json({
      status: 'OK'
    });


  res.json({
    status:'not-modified'
  });
};