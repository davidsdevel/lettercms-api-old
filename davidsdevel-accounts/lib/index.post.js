const bcrypt = require('bcrypt');

module.exports = async function() {
  const {
    isAdmin
  } = this.req;

  if (!isAdmin)
    return this.res.sendStatus(401);

  const {
    subdomain
  } = this.req.body;

  const password = await bcrypt.hash(this.req.body.password, 10);

  const db = await this.Model.Accounts.create({
    ...this.req.body,
    subdomain,
    password
  });

  //TODO: send email with verify token
  this.res.json({
    message: 'OK'
  });
}
