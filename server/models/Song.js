const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const refType = Schema.Types.ObjectId;

const SongSchema = new Schema({
    name: { type: String, required: true },
    picture: { type: String, required: true },
    length: { type: Number, required: true },
    year: { type: Number, required: true },
    language: { type: String, required: true },
    genre: { type: String, required: true },
    likedBy: [{ type: refType, ref: "User" }],
    artists: [{ type: refType, ref: "Artist" }],
});

const Song = mongoose.model("Song", SongSchema, "Song");

module.exports = Song;