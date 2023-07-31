const mongoose = require('mongoose');
// const startup = require('debug')('startup');

const postSchema = new mongoose.Schema({
	author: {
		type: [ String ],
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	tags: {
		type: [String],
	},
	content: {
		type: String,
		required: true,
	},
	comments: {
		type: [String],
	},
	imgURL: String,
})

const Post = mongoose.model('Post', postSchema);

module.exports = Post;