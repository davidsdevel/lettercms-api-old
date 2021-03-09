const {Accounts, Invitations} = require('./schema');
const {model} = require('mongoose');

const AccountModel = model('BlogAccount', Accounts);
const invitationsModel = model('BlogInvitation', Invitations);

module.exports = {
    Accounts: AccountModel,
    Invitations: invitationsModel
};
