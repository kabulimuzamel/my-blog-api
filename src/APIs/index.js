const express = require('express');
const cors = require('cors');
const config = require('config');
const mongoose = require('mongoose');
const startup = require('debug')('startup');
const app = express();
const userRouter = require('./routes/userRoute');
const blogRouter = require('./routes/blogRoute');
const loginRouter = require('./routes/loginRouter');
app.use(express.json());

if(!config.get('jwtPrivateKey')) {
	startup('jwt private key is not defined');
	process.exit();
}

mongoose.connect('mongodb://localhost/blog')
	.then((res) => startup('Connected to the Mongo Database...'))
	.catch((err) => startup('Could not connected to the Mongo Database'))

app.use(cors({ origin: 'http://localhost:3001' }))

app.use('/api/login', loginRouter);
app.use('/api/user', userRouter);
app.use('/api/blog', blogRouter);

// Port

const port = process.env.PORT || 3000;
app.listen(port, () => {
    startup(`Listening on Port ${port}...`)
}) 