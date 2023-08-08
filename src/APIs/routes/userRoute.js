const Joi = require('joi');
const express = require('express');
const userRouter = express.Router();
const User = require('../models/userDataModel');
const Post = require('../models/blogDataModel');
const jwt = require('jsonwebtoken');
const config = require('config');

// Create

userRouter.post('/', async (req, res) => {
    const { error } = validateUser(req);
    if(error) {
        return res.status(400).json({error: error.details[0].message});
    }

    const { name, userName, password } = req.body;

    try {
        const isExist = await User.find({ userName: userName });
        if(isExist.length) {
            return res.status(400).json({error: 'User already exists'});
        }
    
        const user = new User({
            name,
            userName, 
            password
        });
        await user.save();
        return res.status(200).send('Created Successfully');
    }
    catch(ex) {
        res.status(500).send(ex);
    }

});

// Read

userRouter.get('/:token', async(req, res) => {
    const token = req.params.token;
    const decodedPayLoad = jwt.verify(token, config.get('jwtPrivateKey'));
    const user = await User.findOne({
        _id: decodedPayLoad._id,
    }).select('-__v -_id');
    
    if(Object.keys(user).length === 0) {
        return res.status(403).send('Unauthorized')
    }

    return res.status(200).send(user);
});

// Update

userRouter.put('/:token', async(req, res) => {
    const token = req.params.token;
    try {
        const decodedPayLoad = jwt.verify(token, config.get('jwtPrivateKey'));
        const userId = decodedPayLoad._id;
        
        const { error } = validateUser(req);
        if(error) {
            return res.status(400).json({error: error.details[0].message});
        }

        const { name, userName, password } = req.body
        await User.findByIdAndUpdate(userId, {
            $set: {
                name,
                userName, 
                password
            }
        })
        res.status(200).send('Updated successfully');

    }
    catch(ex) {
        res.status(403).send('Unauthorized');
    }
});

// Delete

userRouter.delete('/:token', async (req, res) => {
    const token = req.params.token;
    try {
        const decodedPayLoad = jwt.verify(token, config.get('jwtPrivateKey'));
        const userId = decodedPayLoad._id;
        const posts = await Post.find({
            author: userId
        }).select('_id');
        if(posts.length) {
            posts.forEach(async (postObj) => {
                await Post.findByIdAndDelete(postObj._id)
            })
        } 
        await User.findByIdAndRemove(userId);

        res.status(200).send('Deleted successfully');
    }
    catch (ex) {
        res.status(403).send('Unauthorized');
    }
})

function validateUser(req) {
    const schema = Joi.object({
        name: Joi.string().required().min(1).max(25),
        userName: Joi.string().min(5).max(16).required(),
        password: Joi.string().min(5).max(16).required()
    });

    const result = schema.validate(req.body);
    
    return result;
}

module.exports = userRouter;