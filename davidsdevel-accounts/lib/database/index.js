const {Accounts, Invitations, VerificationCodes} = require('./schema');
const {model} = require('mongoose');

const AccountModel = model('BlogAccount', Accounts);
const invitationsModel = model('BlogInvitation', Invitations);
const codesModel = model('BlogVerifications', VerificationCodes);

module.exports = {
  Accounts: AccountModel,
  Invitations: invitationsModel,
  VerificationCodes: codesModel  
};
