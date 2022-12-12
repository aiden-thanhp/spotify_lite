const User = require('../models/User');
const bcrypt = require('bcryptjs');

const Joi = require('joi');

// Sign Up A New User
const userSchema = Joi.object({
    id: Joi.required(),
    email: Joi.string()
        .email({ minDomainSegments: 2 })
        .required(),
    name: Joi.string()
        .required(),
    bio: Joi.string().allow(null, ''),
    profilePicture: Joi.string().allow(null, '')
})

// display all the songs that a user liked
async function displayAllLikedSongs(id) {
    const allLikedSongs = await User.findOne({ _id: id }, 'likedSongs').populate('likedSongs');
    return allLikedSongs;
}

// user updates their info
async function updateUser(data) {
    await userSchema.validateAsync(data).catch(reason => {
        throw new Error(`Validation Error: ${reason}`)
    })
    const updatedUser = await User.findOneAndUpdate({ _id: data.id }, data, { new: true });
    return updatedUser;
}

module.exports = {
    displayAllLikedSongs,
    updateUser
}