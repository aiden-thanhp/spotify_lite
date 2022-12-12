const { displayAllLikedSongs, updateUser } = require("../utils/UserUtils")

exports.get_displayLikedSongs = (req, res) => { 
    displayAllLikedSongs(req.params.id).then(data => {
        console.log("displayLikedSongs =", data)
        res.status(201).json(data);
    }).catch(e => console.error(e))
}

exports.put_updateInfo = (req, res) => { 
    updateUser(req.body).then(data => {
        console.log("updateUser =", data);
        res.status(201).json(data);
    }).catch(e => console.error(e))
}