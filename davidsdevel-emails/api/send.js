const {manageMethods, sendMail} = require('@lettercms/utils');

const POST = async function() {
  const {req, res} = this;
  const {subdomain, isAdmin} = req;

  const {template, to, data} = req.body;

  if (isAdmin) {
    const {template, email} = data;

    if (template === 'verify') {
      data.role = 'admin';

      const code = jwt.sign(data, process.env.JWT_AUTH, { expiresIn: 60 * 5 });

      await sendMail(data.email, `${data.name} verifica tu cuenta - LetterCMS`, {
        type: 'verify',
        url: `https://lettercms-api-staging.herokuapp.com/api/account/verify?token=${code}&e=${Buffer.from(data.email).toString('hex')}`,
        ...data
      });
    }
  }

  res.json({
    status:'OK'
  });
}

module.exports = manageMethods({
  POST
});
