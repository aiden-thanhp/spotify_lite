const Song = require('../models/Song');
const User = require('../models/User');
const Artist = require('../models/Artist');

// list all songs
async function listAllSongs() {
    try {
        const songList = await Song.find({}).populate("artists")
        return songList
    } catch (e) {
        console.error(e)
    }
}

// display matching songs based on their language
async function displaySongsByLanguage(language) {
    try {
        const songList = await Song.find({ "language": language }).populate("artists");
        return songList;
    } catch (e) {
        console.error(e)
    }
}

// display matching songs based on their genre
async function displaySongsByGenre(searchTerm) {
    try {
        const songList = await Song.find({ "genre": { "$regex": searchTerm, "$options": "i" } }).populate("artists");
        return songList;
    } catch (e) {
        console.error(e)
    }
}

// display matching songs based on artist name
async function displaySongsByArtist(searchTerm) {
    try {
        const songList = await Artist.find({ "name": { "$regex": searchTerm, "$options": "i" } }, "songs").populate("songs");
        return songList.length > 0 ? songList[0]["songs"] : songList
    } catch (e) {
        console.error(e)
    }
}

// display matching songs based on song title
async function displaySongsByTitle(searchTerm) {
    try {
        const songList = await Song.find({ "name": { "$regex": searchTerm, "$options": "i" } }).populate("artists")
        return songList;
    } catch (e) {
        console.error(e)
    }
}

// user likes a song

async function userLikeASong(userId, songId) {
    try {
        console.log(songId)
        const songsLikedByUser = await User.find({ _id: userId }, "likedSongs")
        const songUserLists = await Song.find({ _id: songId }, "likedBy")

        const songsList = songsLikedByUser[0]["likedSongs"];
        const usersList = songUserLists[0]["likedBy"]
        if (!songsList.includes(songId)) songsList.push(songId);
        if (!usersList.includes(userId)) usersList.push(userId);

        const updatedUser = await User.findByIdAndUpdate(userId, { likedSongs: songsList }, { new: true });
        const updatedSong = await Song.findByIdAndUpdate(songId, { likedBy: usersList }, { new: true });
        console.log("updatedSongs =", updatedSong);
        console.log("updatedUser =", updatedUser)

        return updatedUser;
    } catch (e) {
        console.error(e)
    }
}

module.exports = {
    displaySongsByLanguage,
    displaySongsByGenre,
    displaySongsByArtist,
    displaySongsByTitle,
    userLikeASong,
    listAllSongs
}

