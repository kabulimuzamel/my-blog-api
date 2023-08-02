const Joi = require('joi');
const express = require('express');
const userRouter = express.Router();
const User = require('../models/userDataModel');

userRouter.post('/', async (req, res) => {
    const { error } = validateUser(req);
    if(error) {
        return res.status(400).json({error: error.details[0].message});
    }
    const { userName, password } = req.body;

    try {
        const isExist = await User.findOne({ userName: userName });
        if(isExist) {
            return res.status(400).json({error: 'User already exist'});
        }
    
        const user = new User({
            userName, 
            password
        });
    
    
        await user.save();
        return res.send('Created Successfully').status(200)
    }
    catch(ex) {
        res.status(500).send(ex);
    }
})

function validateUser(req) {
    const schema = Joi.object({
        userName: Joi.string().min(5).max(16).required(),
        password: Joi.string().min(5).max(16).required()
    });

    const result = schema.validate(req.body);
    
    return result;
}

module.exports = userRouter;