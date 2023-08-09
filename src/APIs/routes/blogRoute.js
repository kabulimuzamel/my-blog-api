const Joi = require('joi');
const express = require('express');
const blogRouter = express.Router();
const User = require('../models/userDataModel')
const Post = require('../models/blogDataModel');
const jwt = require('jsonwebtoken');
const config = require('config');

// CRUD

// C - Create

blogRouter.post('/:token', async (req, res) => {
    const token = req.params.token;
    try {
        const decodedPayLoad = jwt.verify(token, config.get('jwtPrivateKey'));
        const user = await User.findOne({
            _id: decodedPayLoad._id,
        }).select('-__v -password');
        const { error } = validatePost(req.body)
        if (error) {
            return res.status(400).json({ error: error.details[0].message })
        }
        const userId = user._id;
        const { title, content } = req.body;
        const post = new Post({
            author: userId, 
            title,
            content, 
        });
        const result = await post.save();
        res.status(200).send(result);
        
    } catch (ex) {
        return res.status(400).json('Unauthorized')
    }
});


// R - Read
blogRouter.get('/', async (req, res) => {
    const posts = await Post.find().select('-__v').populate('author', 'name -_id userName');
    res.send(posts);
});

blogRouter.get('/:token', async (req, res) => {
    const token = req.params.token;
    
    try {
        const decodedPayLoad = jwt.verify(token, config.get('jwtPrivateKey'));
        const post = await Post.find({
            author: decodedPayLoad._id,
        }).select('-__v').populate('author', 'name userName')
        res.status(200).send(post);
    } catch (ex) {
        return res.status(400).json('Unauthorized')
    }
})

// U - Update
    
blogRouter.put('/:token/:postId', async (req, res) => {
    const token = req.params.token;
    const reqKeys = ['title', 'content']
	const validKey = []
	const inValidKey = []

	try {
        const decodedPayLoad = jwt.verify(token, config.get('jwtPrivateKey'));
        const user = await User.findOne({
            _id: decodedPayLoad._id,
        }).select('-__v -_id -password');
        if(Object.keys(user).length === 0) {
            return res.status(403).json('Access denied');
        }
		const post = await Post.findById(req.params.postId)

		const body = req.body
		if (Object.keys(body).length === 0) {
			return res.status(400).json("You didn't enter anything")
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
			return res.status(400).json(invalidKeysMessage)
		}

		await post.save()
		return res.status(200).send('Updated successfully')
	} catch (err) {
		return res.status(500).send('Server Error')
	}
});


// D - Delete

blogRouter.delete('/:token/:postId', async  (req, res) => {
    const token = req.params.token;
    try {
        const decodedPayLoad = jwt.verify(token, config.get('jwtPrivateKey'));
        const user = await User.findOne({
            _id: decodedPayLoad._id,
        }).select('-__v -_id -password');
        if(Object.keys(user).length === 0) {
            return res.status(403).send('Access denied');
        }
        const post = await Post.findByIdAndRemove(req.params.postId);
        if(!post) {
            return res.status(404).send('Post not found')
        }
        return res.send('Post deleted')
    }
    catch(ex) {
        return res.status(403).send('Unauthorized')
    }
})


function validatePost(req) {
    const schema = Joi.object({
        title: Joi.required(),
        content: Joi.required(),
    });

    const result = schema.validate(req);
    return result;
}

module.exports = blogRouter;