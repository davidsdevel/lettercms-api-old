module.exports = async function() {
  const {
    Model,
    req,
    res
  } = this;
  
  const {
    isAdmin
  } = req;

  if (!isAdmin)
    return res.sendStatus(401);


  const {
    code,
    email
  } = req.body;

  const exists = await Model.VerificationCodes.findOne({
    email
  });

  if (!exists)
    return res.status(400).json({
      message: 'Expired Token'
    });

  if (exists.expiresIn < Date.now())
    return res.status(400).json({
      message: 'Expired Token'
    });

  if (exists.code !== code)
    return res.json({
      status: 'verification-code-mismatch',
      message: 'Wrong verification code'
    });

  await Model.VerificationCodes.deleteOne({email});
  await Model.Accounts.updateOne({email}, {
    verified: true
  });
  
  res.json({
    message: 'OK'
  });
}