const {Accounts, Invitations, VerificationCodes} = require('./schema');
const bcrypt = require('bcrypt');
const {Letter} = require('@lettercms/sdk');
const jwt = require('jsonwebtoken');

/**
 * Login
 *
 * @public
 *
 * @param {String} email
 * @param {String} password
 *
 * @return {Promise<String|Object>}
 */
Accounts.statics.login = async function(email, password) {
  try {
    console.log(email,password)

    const account = await this.findOne({ email }, 'password subdomain', {lean: true});
    console.log(account)

    if (!account)
      return Promise.resolve({
        code: 'no-account',
        message: 'Email does not exists'
      });

    const pass = await bcrypt.compare(password, account.password);
    console.log(pass)


    if (pass) {
      const accessToken = jwt.sign({
        subdomain: account.subdomain,
        account: account._id
      }, process.env.JWT_AUTH);
      
      return Promise.resolve({
        id: account._id,
        accessToken
      });
    }

    return Promise.resolve({
      code: 'invalid-password',
      message: 'Invalid Password'
    });
  } catch (err) {
    console.log(err)
    return Promise.reject(err);
  }
}

module.exports = {
  Accounts,
  Invitations,
  VerificationCodes
};
