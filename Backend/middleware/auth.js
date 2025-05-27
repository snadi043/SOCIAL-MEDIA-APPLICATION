// Re-named the file name from 'is-auth' with 'auth' because now this file is not responsible for 
// verifying the status of the authentication or denying the status but takes care of alterning the 
// result for the request if the header is not present.

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if(!authHeader){
        // Setting isAuth property to handle it in the resolvers whereever there is a condition for the validation.
        req.isAuth = false;
        return next();
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try{
        decodedToken = jwt.verify(token, 'enterasecretkeyhere');
    }
    catch(err){
       // Setting isAuth property to handle it in the resolvers whereever there is a condition for the validation.
       req.isAuth = false;
       return next();
    }
    if(!decodedToken){
       // Setting isAuth property to handle it in the resolvers whereever there is a condition for the validation.
       req.isAuth = false;
       return next();
    }
    req.userId = decodedToken.userId;
    req.isAuth = true; // Finally, is all the validation conditions are through then setting the isAuth property to true.
    next();
};