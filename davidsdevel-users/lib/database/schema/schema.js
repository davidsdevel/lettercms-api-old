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
	}
});
