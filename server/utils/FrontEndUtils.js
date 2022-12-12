const path = require('path')
const Joi = require('joi');
require('dotenv').config(path.join(__dirname, '../.env'));
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

const User = require("../models/User");

// Sign Up A New User
const newUserSchema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(4)
        .required(),
    password: Joi.string()
        .min(6)
        .max(16)
        .required(),
    email: Joi.string()
        .email({ minDomainSegments: 2 })
        .required(),
    name: Joi.string()
        .required(),
    bio: Joi.string().allow(null, ''),
    profilePicture: Joi.string().allow(null, '')
})

async function usernameExists(username) {
    const check = await User.exists({ "username": username });
    return check
}

async function emailExists(email) {
    const check = await User.exists({ "email": email });
    return check
}

async function findUsername(username) {
    const user = await User.find({ "username": username });
    return user
}

async function findEmail(email) {
    const user = await User.find({ "email": email });
    return user
}

async function createNewUser(data) {
    await newUserSchema.validateAsync(data).catch(reason => {
        throw new Error(`Validation Error: ${reason}`)
    })

    const usernameCheck = await usernameExists(data["username"]);
    if (usernameCheck) throw new Error(`Username already exists`);

    const emailCheck = await emailExists(data["email"]);
    if (emailCheck) throw new Error(`Email already exists`);

    const hasedPassword = await bcrypt.hash(data["password"], Number(process.env.SALT))
    data["password"] = hasedPassword
    const newUser = await User.create(data);
    return newUser
}

// Log In A User
const loginSchema = Joi.alternatives().try(
    Joi.object().keys({
        username: Joi.string().required(),
        password: Joi.string().required(),
    }),
    Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    })
);

async function logInUser(data) {
    const res = await loginSchema.validateAsync(data).catch(reason => {
        throw new Error(`Validation Error: ${reason}`)
    })

    const user = data["email"] ? await findEmail(data["email"]) : await findUsername(data["username"]);
    const compare = await bcrypt.compare(data["password"], user[0]["password"]);
    
    if (compare) {
        const token = {
            _id: user[0]["_id"],
            role: "user"
        }
        console.log(token)
        const signed_jwt = jwt.sign(token, process.env.JWT_KEY, { expiresIn: `${3 * 60 * 60}` });

        return signed_jwt;
    } else throw new Error(`Error: Invalid Login Information`)
}

module.exports = {
    createNewUser,
    logInUser
}