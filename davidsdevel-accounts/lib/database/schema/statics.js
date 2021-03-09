const {Accounts, Invitations} = require('./schema');
const bcrypt = require('bcrypt');
const {Letter} = require('C:/Users/pc/Documents/Proyectos/letterCMS/davidsdevel-microservices/SDK');
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
    const account = await this.findOne({ email }, 'email subdomain password role name lastname persmissions', {lean: true});

    if (!account)
      return Promise.resolve({ pass: false, message: 'Email no existe' });

    const token = jwt.sign({subdomain: account.subdomain}, 'davidsdevel');

    const sdk = new Letter(token);

    const {plan} = await sdk.blogs.single(['plan'])

    const pass = await bcrypt.compare(password, account.password);

    if (pass) {
      return Promise.resolve({
        ...account,
        plan,
        password: undefined,
        pass: true,
      });
    }

    return Promise.resolve({
      pass: false,
      message: 'Contraseña incorrecta',
    });
  } catch (err) {
    return Promise.reject(err);
  }
}

module.exports = {
  Accounts,
  Invitations
};
