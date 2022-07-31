const {manageMethods} = require('@lettercms/utils');
const POST = require('../lib/index.post');

module.exports = manageMethods({
  POST
});
 
 /**
  * POST /comment
  * GET /comment/:postID
  * POST /comment/:comment
  * DELETE /comment/:comment
  *
  */