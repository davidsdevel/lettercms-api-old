const {Schema} = require('mongoose');

const Facebook = new Schema({
  subdomain: {
    type: String,
    required: true
  },
  token: {
    type: String,
    unique: true
  },
  name: String,
})