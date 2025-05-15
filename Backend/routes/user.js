const express = require('express');

const {body} = require('express-validator');

const userController = require('../controller/user');

const User = require('../models/user');

const router = express.Router();

router.post('/signup',
    [
        body('email')
        .isEmail()
        .isLength({min: 7})
        .withMessage('Please enter a valid email.')
        .custom((value, {req}) => {
            return User.findOne({email: value}).then(user => {
                if(user){
                    return Promise.reject('Email already exists, Please try with a new email');
                }
            });
        })
        .normalizeEmail(),
        body('name')
        .isString()
        .trim()
        .isLength({min: 5})
        .withMessage('Please enter a valid email.')
        .custom((value, {req}) => {
            if(value != req.body.name){
                throw new Error('Please enter a name with atleast 5 charecters');
            }
        }),
        body('password')
        .isString()
        .trim()
        .isLength({min: 5})
        .withMessage('Please enter a valid password.')
        .custom((value, {req}) => {
            if(value != req.body.password){
                throw new Error('Please enter a password with atleast 5 charecters');
            }
        }),
    ], 
    userController.postUserSignUp);

module.exports = router;