const bcrypt = require('bcrypt');

module.exports = async function() {
  const {req, res} = this;

  const {subdomain} = req;

  const password = await bcrypt.hash(req.body.password, 10);

  await this.Model.create({
    ...req.body,
    subdomain,
    verified: true,
    password
  });

  //TODO: send email with verify token
  res.json({
    message: 'OK'
  });
}