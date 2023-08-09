const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	publishedDate: {
		type: Date,
		default: Date.now
	},
	content: {
		type: String,
		required: true,
	},
})

const Post = mongoose.model('Post', postSchema);

module.exports = Post;