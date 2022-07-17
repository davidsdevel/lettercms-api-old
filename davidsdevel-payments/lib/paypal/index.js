const getOauth = require('./getOauth');
const getAccessToken = require('./getAccessToken');
const createOrder = require('./createOrder');
const patchOrder = require('./patchOrder');
const getOrder = require('./getOrder');
const captureOrder = require('./captureOrder');



module.exports = {
   getOauth,
   getAccessToken,
   createOrder,
   patchOrder,
   getOrder,
   captureOrder
};
