const { userFollowsArtist } = require("../utils/ArtistUtils")

exports.put_userFollowsAnArtist = (req, res) => {
    const { id } = req.body
    userFollowsArtist(id, req.params.artist_id).then(data => {
        console.log("updatedUser =", data);
        res.status(201).json({ message: `User ${req.body} followed artist ${req.params.artist_id}`})
    }).catch(e => console.error(e))
}