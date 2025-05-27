// // This is the file which deals with the actual data for the key which is defined in the schema file under the "query" property.
// module.exports = {
//     hello(){
//         return {
//             title: 'Hello World',
//             value: 12567,
//         };   
//     }
// }

// Importing the User Model to implement the user validation.
const User =  require('../models/user');
//Importing bcrypt package to hash the password.
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const validator = require('validator');

module.exports = {
    // Implementing the concept of async and await to execute the resolver function.
    // The resolver function usually accepts {args, req} which can also be replaced by 
    // object destructuring by directly accepting the userInput which is expected from the mutation defined in the schema.
    createUser: async function ({userInput}, req){
        // Implementing error-handling in graphql using "validator" package.
        const errors = [];
        if(!validator.isEmail(userInput.email)){
            errors.push({message: 'Invalid E-mail address'});
        }
        if(validator.isEmpty(userInput.password) || !validator.isLength(userInput.password, {min: 5})){
            errors.push({message: 'Password is too short'});
        }
        if(errors.length > 0){
            const error = new Error('Invalid input');
            error.data = errors;
            error.code = 422;
            throw error;
        }

        const email = userInput.email;
        const existingUser = await User.findOne({email: email});
        // Error validation for existing user.
        if(existingUser){
            const error = new Error('User with the email exists already');
            throw error;
        }
        // Hashing the password with the help of bcrypt package.
        const hashedPswd = await bcrypt.hash(userInput.password, 12);
        const user = new User({
            email: userInput.email,
            name: userInput.name,
            password: hashedPswd
        });
        const createdUser = await user.save();
        return { ...this.createUser.doc, _id: createdUser._id.toString()}
    },
    login: async function({email, password}, req){
        const user = User.findOne({email: email});
        if(!user){
            const error = new Error('User not found');
            error.code = 401;
            throw error;
        }
        const isEqual = bcrypt.compare(password, user.password);
        if(!isEqual){
            const error = new Error('Passwords didnot match');
            error.code = 401;
            throw error;
        }
        const token = jwt.sign({
            userId: user._id.toString(),
            email: user.email
        },
        'enterasecretkeyhere',
        {
            expiresIn: '1h'
        });
        return {token: token, userId: user._id.toString()};
    }
};