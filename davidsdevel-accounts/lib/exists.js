module.exports = async function() {
  const exists = await this.Model.Accounts.exists(this.req.query);

  if (exists)
    this.res.sendStatus(200);
  else
    this.res.sendStatus(404);
}