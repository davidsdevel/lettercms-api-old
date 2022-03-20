const {Schema} = require('mongoose');

module.exports = new Schema({
	subdomain: {
		type: String,
		required: true
	},
	name: String,
	lastname: String,
	email:{
		type: String,
		unique: true,
	},
	feed: {
		type: Array,
		default: []
	},
	messagingToken: String,
	verified: {
		type: Boolean,
		default: false,
		required: true
	},
	active: {
		type: Boolean,
		required: true,
		default: false
	},
	newUser: {
		type: Boolean,
		required: true,
		default: true
	},
	device: {
    type: String,
    required: true,
    enum: ['mobile', 'desktop']
  },
	/*,
	isBlocked: {
		type: Boolean,
		default: false,
		required: true
	}*/
});
