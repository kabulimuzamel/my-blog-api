const jwt = require('jsonwebtoken');
const config = require('config');

function authToken (req, res, next) {
    const token = req.header('x-auth-token');
    if(!token) {
        return res.status(401).send('Access denied')
    }

    try {
        const decodedPayLoad = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decodedPayLoad;
        next();
    }
    catch(ex) {
        res.status(400).send('Invalid token')
    }
}

module.exports = authToken;