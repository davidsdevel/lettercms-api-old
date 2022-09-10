const {manageMethods} = require('@lettercms/utils');
const GET = require('../../lib/find');
const DELETE = require('../../lib/url.delete');

export default manageMethods({
  GET,
  DELETE
});
