const {Schema} = require('mongoose');

module.exports = new Schema({
	subdomain: {
		type: String,
		required: true
	},
	title:{
		type: String,
		default: ''
	},
	description:{
		type: String,
		default: ''
	},
	tags: Array,
	category: {
		type: String,
		default: ''
	},
	content: {
		type: String,
		default: ''
	},
	comments: {
		type: Number,
		default: 0
	},
	created: Date,
	published: Date,
	updated:{
		type: Date,
		default: Date.now
	},
	authorEmail: String,
	postStatus: {
		type: String,
		default: 'draft'
	},
	images: Array,
	thumbnail: {
		type: String,
		default: ''
	},
	url: {
		type: String,
		default: ''
	},
	views: {
		type: Number,
		default: 0
	},
	isProtected: {
		type: Boolean,
		default: false,
		required: true
	}
});
