const Joi = require('joi');
const express = require('express');
const blogRouter = express.Router();
const User = require('../models/userDataModel')
const Post = require('../models/blogDataModel');
const authToken = require('../middleware/authToken')

// CRUD

// C - Create

blogRouter.post('/', authToken, async (req, res) => {
    const { error } = validatePost(req.body, res);
    if(error) {
        res.status(400).json({ error: error.details[0].message })
    }
    const { author, title, tags, content, comments } = req.body;
    const post = new Post({
        author, 
        title,
        tags,
        content, 
        comments
    });
    await post.save();
});


// R - Read
blogRouter.get('/', async (req, res) => {
    const posts = await Post.find().select('-__v');
    res.send(posts);
});

async function authenticateUser(req, res, next) {
    const { userName, password } = req.body;
    const user = await User.find({
        $and: [
            { userName: userName },
            { password: password }
        ]
    });

    if(!user) {
        res.status(401).json({ error: 'The entered username or password is wrong' })
    }

    next();
}


// blogRouter.get('/:userName', authenticateUser, async (req, res) => {
//     const posts = await Post.find({ userName: req.params.userName }).select('-__v');
//     res.send(posts);
// });

blogRouter.get('/:title', async (req, res) => {
    const post = await Post.find({
        title: req.params.title,
    }).select('-__v -_id')
    if(!post.length) {
        return res.status(404).send(`Not found`);
     }
     
     res.send(post);
    })

// U - Update
    
blogRouter.put('/:id', authToken, async (req, res) => {
    const reqKeys = ['author', 'title', 'content', 'tags', 'comments']
	const validKey = []
	const inValidKey = []

	try {
		const post = await Post.findById(req.params.id)
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

blogRouter.delete('/:id', authToken, async  (req, res) => {
    try {
        const post = await Post.findByIdAndRemove(req.params.id);
       
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

    const result = schema.validate(req);
    return result;
}

module.exports = blogRouter;