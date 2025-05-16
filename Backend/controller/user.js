const { validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.postUserSignUp = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const error = Error('Unable to process the user singup.');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    bcrypt.hash(password, 12).then(hashPswd => {
       const user = new User({
            name: name,
            email: email,
            password: hashPswd,
       });
       return user.save();
    })
    .then(user => {
        if(!user){
            const error = new Error('Unable to authenticate the user');
            error.statusCode = 422;
            throw error;
        }
        res.status(201).json({
            message: 'User created successfully',
            userId: user._id,
        });
    })
    .catch(err => {
        if(!err.statusCode){
            err.statusCode = 500; 
        }
        next(err);
    });
}


exports.postUserLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email: email})
    .then(user => {
        if(!user){
            const error = new Error('Unable to find the user with provided email and password');
            error.statusCode = 401;
            throw error;
        }
        return bcrypt.compare(password, user.password)
        .then(isEqual => {
            if(!isEqual){
                const error = new Error('Passwords does not match. Please try again');
                error.statusCode = 401;
                throw error;
            }
            const token = jwt.sign({
                email: user.email,
                userId: user._id.toString(),
            },
            'enterasecretkeyhere',
            {expiresIn: '1h'});
            res.status(200).json(
                {
                    email: email,
                    userId: user._id.toString(),
                    token: token
                });
        })
        .catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next (err);
    });
});
}
