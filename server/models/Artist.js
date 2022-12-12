const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const refType = Schema.Types.ObjectId;

const ArtistSchema = new Schema({
    name: { type: String, required: true },
    verified: { type: Boolean, required: true },
    picture: { type: String, required: true },
    bio: { type: String, required: true },
    monthlyListeners: { type: Number, required: true },
    followers: [{ type: refType, ref: "User" }],
    songs: [{ type: refType, ref: "Song" }]
});

const Artist = mongoose.model("Artist", ArtistSchema, "Artist");

module.exports = Artist;