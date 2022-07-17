const {manageMethods} = require('@lettercms/utils');
const GET = require('../../../lib/order.get');

module.exports = manageMethods({
  GET,
  POST: GET
});

//PATCH