const Artist = require('../models/Artist');
const User = require('../models/User')

// user follows an artist
async function userFollowsArtist(userId, artistId) {
    try {
        const artistsFollowedByUser = await User.find({ _id: userId }, "followedArtists")
        const artistUserList = await Artist.find({ _id: artistId }, "followers")
        const artistsList =  artistsFollowedByUser[0]["followedArtists"]
        const followersList = artistUserList[0]["followers"]
        if (!artistsList.includes(artistId)) artistsList.push(artistId);
        if (!followersList.includes(userId)) followersList.push(userId);

        const updatedUser = await User.findByIdAndUpdate(userId, { followedArtists: artistsList }, { new: true });
        const updatedArtist = await Artist.findByIdAndUpdate(artistId, { followers: followersList }, { new: true });
        console.log("updatedUser =", updatedUser);
        console.log("updatedArtist =", updatedArtist)

        return updatedUser;
    } catch (e) {
        console.error(e)
    }
}

module.exports = {
    userFollowsArtist
}