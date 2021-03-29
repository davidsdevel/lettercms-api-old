module.exports = async function() {
  const {
    role
  } = this.req.query;

  const {subdomain} = this.req;

  const conditions = {};

  if (role)
    conditions.role = role;
  if (subdomain)
    conditions.subdomain = subdomain;

  const data = await this.find(Object.assign({accounts: true}, this.req.query), this.Model.Accounts, conditions);

  this.res.json(data);
}
