const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const refType = Schema.Types.ObjectId;

const UserSchema = new Schema({
    name: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    profilePicture: { type: String },
    bio: { type: String },
    followedArtists: [{ type: refType, ref: "Artist" }],
    likedSongs: [{ type: refType, ref: "Song" }]
});

const User = mongoose.model("User", UserSchema, "User");

module.exports = User;