const {Schema} = require('mongoose');

const Category = new Schema({
	name: {
		type: String,
		unique: true,
		required: true
	},
	alias: {
		type: String,
		required: true
	}
});

module.exports = new Schema({
	subdomain:{
		type: String,
		unique: true,
		required: true
	},
	customDomain: {
		type: String,
		unique: true
	},
	plan: {
		// Free|Pro|Premium
		type: String,
		required: true,
		default: 'free'
	},
	lastPayment: Date,
	ownerEmail: String, //Account Email
	url: {
		type: String,
		default: '1',
		required: true
	},
	categories: [Category],
	mainUrl: {
		type: String,
		required: true,
		default: '/'
	},
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	thumbnail: String
});
