const {posts} = require('@lettercms/models');
const formidable = require('formidable');

module.exports = async function() {
  const form = formidable({ multiples: true });

  form.parse(this.req, async (err, fields) => {
    if (fields.cms === 'blogger')
      await posts.importBlogger(this.req.subdomain, JSON.parse(fields.data));

    this.res.json({
      status: 'OK'
    });
  });
};