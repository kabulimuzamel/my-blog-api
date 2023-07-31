const Joi = require('joi');
const express = require('express');
const blogRouter = express.Router();
const Post = require('../models/blogDataModel');

// CRUD

// C - Create

blogRouter.post('/', async (req, res) => {
    validatePost(req.body, res);
    const { author, title, tags, content, comments } = req.body;
    const post = new Post({
        author, 
        title,
        tags,
        content, 
        comments
    });
    const result = await post.save();
    res.send(result);
});

// R - Read

blogRouter.get('/', async (req, res) => {
    const posts = await Post.find().select('-__v -_id');
    res.send(posts);
});

blogRouter.get('/:author', async (req, res) => {
    const post = await Post.find({
        author: req.params.author,
    }).select('-__v -_id')
    if(!post.length) {
        return res.status(404).send(`Not found`);
     }
     
     res.send(post);
    })

// U - Update
    
blogRouter.put('/:title', async (req, res) => {
    const reqKeys = ['author', 'title', 'content', 'tags', 'comments']
	const validKey = []
	const inValidKey = []

	try {
		const post = await Post.findOne({ title: req.params.title })
		if (!post) {
			return res.status(404).send('Post Not Found')
		}

		const body = req.body
		if (Object.keys(body).length === 0) {
			return res.status(400).send("You didn't enter anything")
		}

		Object.keys(body).forEach((key) => {
			if (reqKeys.includes(key)) {
				validKey.push(key)
				post[key] = body[key]
			} else {
				inValidKey.push(key)
			}
		})

		if (inValidKey.length) {
			const invalidKeysMessage = `Following keys are invalid: ${inValidKey.join(
				', '
			)}`
			return res.status(400).send(invalidKeysMessage)
		}

		const result = await post.save()
		return res.status(200).send(result)
	} catch (err) {
		console.error(err)
		return res.status(500).send('Server Error')
	}
});


// D - Delete

blogRouter.delete('/:query', async  (req, res) => {
    try {
        const post = await Post.findOneAndRemove({ title: req.params.query });
       
        if(!post) {
            return res.status(404).send('Post not found')
        }
        return res.send('Post deleted')
    }
    catch(ex) {
        return res.status(500).send('ServerError')
    }
})


function validatePost(req, res) {
    const schema = Joi.object({
        author: Joi.required(),
        title: Joi.required(),
        tags: Joi.string(),
        content: Joi.required(),
        comments: Joi.string(),
    });

    const { error } = schema.validate(req);

    if(error) {
        return (
            res.status(400).send(error.details[0].message)
        )
    }
}

module.exports = blogRouter;