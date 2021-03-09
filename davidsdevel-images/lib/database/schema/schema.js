const {Schema} = require('mongoose');

const Images = new Schema({
  subdomain: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required:true
  },
  blob: {
    type: Buffer,
    required: true
  },
  thumbnail: String
});

module.exports = Images;
