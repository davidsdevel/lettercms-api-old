const {Schema} = require('mongoose');

module.exports = new Schema({
	subdomain: {
		type: String,
		required: true
	},
	title: String,
	description: String,
	html: String,
	css: String,
	styles: String,
	components: String,
	created:{
		type: Date,
		required: true
	},
	published: Date,
	updated:{
		type: Date,
		default: Date.now
	},
	pageStatus: String,
	images: String,
	url: String,
	views: {
		type: Number,
		default: 0
	}
});
