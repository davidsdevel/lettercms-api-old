const bcrypt = require('bcrypt');

const generateCode = _ => {
  let code = '';

  for(let i = 0; i < 4; i++) {
    code += Math.round(Math.random() * 9);
  }

  return code;
}

module.exports = async function() {
  const {req,res,Model} = this;
  const {
    isAdmin
  } = req;

  if (!isAdmin)
    return res.sendStatus(401);

  const {
    subdomain,
    email
  } = req.body;

  const existsAccount = await Model.Accounts.exists({
    email
  })

  if (existsAccount)
    return res.json({
      code: 'email-exists',
      message: 'Email already exists'
    })

  const password = await bcrypt.hash(req.body.password, 10);

  const db = await Model.Accounts.create({
    ...req.body,
    subdomain,
    password
  });

  const code = generateCode();

  await Model.VerificationCodes.create({
    code,
    email: req.body.email,
    expiresIn: Date.now() + (1000 * 60 * 60 * 24)
  });

  console.log(code)

  //TODO: send email with verify token
  res.json({
    id: db._id,
    status: 'OK',
    code
  });
}
