const formidable = require('formidable');

module.exports = async function() {
  const form = formidable({ multiples: true });

  form.parse(this.req, async (err, fields, files) => {
    if (fields.cms === 'blogger')
      await this.Model.importBlogger(this.req.subdomain, JSON.parse(fields.data));

    this.res.json({
      message: 'OK'
    });
  });
}