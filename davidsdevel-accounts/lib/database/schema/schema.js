const {Schema} = require('mongoose');

const Accounts = new Schema({
	subdomain: String,
	name: String,
	lastname: String,
	verified: {
		type: Boolean,
		required: true,
		default: false
	},
  firstTime: {
    type: Boolean,
    required: true,
    default: true
  },
  lastLogin: Date,
	description: String,
	ocupation: String,
	role: String, //Admin|Colaborator|single
  permissions: {
    type: Array,
    default: [
      'posts',
      'pages',
      'stats',
      'social',
      'email',
      'config',
      'accounts',
    ]
  },
	photo: String,
	email:{
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	website: String,
	facebook: String,
	twitter: String,
	instagram: String,
	linkedin: String,
});

const Invitations = new Schema({
	subdomain: {
		type:String,
		required: true
	},
	type: {
		type:String, //Colaborator|single
		required: true
	},
	email:{
		type: String,
		unique: true,
		required: true
	},
  permissions: Array
});

const VerificationCodes = new Schema({
  code: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  expiresIn: Date
});

module.exports = {
	Invitations,
	Accounts,
  VerificationCodes
}