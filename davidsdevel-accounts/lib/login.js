module.exports = async function() {
  const {
    email,
    password
  } = this.req.body;

  const data = await this.Model.login(email, password);

  this.res.json({
    ...data,
    pass: undefined
  });
}