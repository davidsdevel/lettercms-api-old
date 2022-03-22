const {manageMethods} = require('@lettercms/utils');
const Model = require('../../lib/database');
const GET = require('../../lib/invitationSingle.get');

module.exports = manageMethods(Model.Invitations, {
  GET
});
