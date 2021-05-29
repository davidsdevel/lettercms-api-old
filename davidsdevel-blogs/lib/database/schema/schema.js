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
		type: String
	},
	plan: {
		type: String,
		required: true,
		enum: ['free', 'pro', 'premium'],
		default: 'free'
	},
	isVisible: {
		type: Boolean,
		default: false,
		required: true
	},
	hasCustomRobots: {
		type: Boolean,
		default: false,
		required: true
	},
	robots: String,
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
