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
    const account = await this.findOne({ email }, 'subdomain password', {lean: true});

    if (!account)
      return Promise.resolve({ pass: false, message: 'Email no existe' });

    const pass = await bcrypt.compare(password, account.password);

    if (pass) {
      const accessToken = jwt.sign({subdomain: account.subdomain}, 'davidsdevel');
      
      return Promise.resolve({
        id: account._id,
        accessToken
      });
    }

    return Promise.resolve({
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
