const express = require('express');
const loginRouter = express.Router();
const User = require('../models/userDataModel');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const config = require('config')

loginRouter.post('/', async (req, res) => {
	const { error } = validateUserLogin(req)
	if (error) {
		return res.status(400).json({ error: error.details[0].message })
	}
	const { userName, password } = req.body
	const user = await User.findOne({ userName: userName, password: password });

	if (!user) {
		return res.status(400).json({ error: 'Invalid username or password' })
	}

    const token = user.generateAuthToken();
    res.header('x-auth-token', token);
    res.status(200).send(token);
});

function validateUserLogin(req) {
	const schema = Joi.object({
		userName: Joi.string().min(5).max(16).required(),
		password: Joi.string().min(5).max(16).required(),
	})

	const result = schema.validate(req.body)
    
	return result
}

module.exports = loginRouter;