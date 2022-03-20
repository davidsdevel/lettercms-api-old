const bcrypt = require('bcrypt');

module.exports = async function() {
  const {
    req,
    res,
    Model: {Accounts}
  } = this;

  const {subdomain} = req;

  const password = await bcrypt.hash(req.body.password, 10);

  await Accounts.create({
    ...req.body,
    subdomain,
    verified: true,
    password
  });

  //TODO: send email with verify token
  res.json({
    status: 'OK'
  });
}
