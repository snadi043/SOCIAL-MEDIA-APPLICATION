const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if(!authHeader){
        const error = new Error('Unable to find the auth Headers.');
        error.statusCode = 401;
        throw error;
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try{
        decodedToken = jwt.verify(token, 'enterasecretkeyhere');
    }
    catch(err){
        error.statusCode = 500;
        throw err;
    }
    if(!decodedToken){
        const error = new Error('Unable to match the tokens to check for validations');
        error.statusCode = 500;
        throw error;
    }
    req.userId = decodedToken.userId;
    next();
};