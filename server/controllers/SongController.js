const { displaySongsByLanguage, displaySongsByGenre, displaySongsByTitle, displaySongsByArtist, userLikeASong, listAllSongs } = require("../utils/SongUtils")

exports.get_listAllSong = (req, res) => {
    listAllSongs().then(data => {
        console.log("All Song =", data);
        res.status(201).json(data)
    }).catch(e => console.error(e))
}

exports.get_listSongByLanguage = (req, res, next) => {
    if (req.query.language) {
        displaySongsByLanguage(req.query.language).then(data => {
            console.log("songsByLanguage =", data);
            res.render('search', { allSongs: data })
        }).catch(e => console.error(e))
    } else next()    
}

exports.get_listSongByGenre = (req, res, next) => {
    displaySongsByGenre(req.query.search).then(data => {
        if (data.length > 0) {
            console.log("Genre", data)
            console.log("songsByGenre =", data);
            res.render('search', { allSongs: data })
        } else next()
    }).catch(e => console.error(e))
}

exports.get_listSongByArtist = (req, res, next) => {
    displaySongsByArtist(req.query.search).then(data => {
        if (data.length > 0) { 
            console.log("Artist", data)
            console.log("songsByArtist =", data);
            res.render('search', { allSongs: data })
        } else next()
    }).catch(e => console.error(e))
}

exports.get_listSongByTitle = (req, res) => {
    displaySongsByTitle(req.query.search).then(data => {
        console.log("Title", data)
        if (data.length > 0) { 
            console.log("songsByTitle =", data);
            res.render('search', { allSongs: data })
        } else next()
    }).catch(e => console.error(e))
}

exports.put_userLikesASong = (req, res) => {
    const { id } = req.body;
    userLikeASong(id, req.params.songId).then(data => {
        console.log("updatedUser =", data);
        res.status(201).json({ message: `User ${req.body} liked song ${req.params.songId}`})
    }).catch(e => console.error(e))
}