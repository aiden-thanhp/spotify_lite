const Song = require("../models/Song");
const User = require("../models/User")
const { createNewUser, logInUser } = require("../utils/FrontEndUtils");

exports.get_AuthPage = async (req, res) => {
    try {
        const token = req.cookies.jwt;
        const data = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
        const user = await User.find({_id:data["_id"]}).populate("likedSongs").populate("followedArtists");
        const allSongs = await Song.find({}).populate("artists");
        res.render('auth', { allSongs:allSongs, user:user })
    } catch (e) {
        console.log(e);
        res.status(400).send({'Error': e.message})
    }
}

exports.get_LikedSongsPage = async (req, res) => {
    try {
        const token = req.cookies.jwt;
        const data = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
        const user = await User.find({_id:data["_id"]}).populate("likedSongs").populate("followedArtists");
        const likedSongs = user[0]["likedSongs"]
        res.render('likedSongs', { allSongs:likedSongs, user:user })
    } catch (e) {
        console.log(e);
        res.status(400).send({'Error': e.message})
    }
}

exports.get_homePage = async (req, res) => {
    try {
        const allSongs = await Song.find({}).populate("artists");
        res.render('home', { allSongs })
    } catch (e) {
        console.log(e);
        res.status(400).send({'Error': e.message})
    }
}

exports.get_songPage = async (req, res) => {
    try {
        const { songId } = req.params
        const song = await Song.find({ _id: songId }).populate("artists");
        res.render('song', { song })
    } catch (e) {
        console.log(e);
        res.status(400).send({'Error': e.message})
    }
}

exports.get_authSongPage = async (req, res) => {
    try {
        const token = req.cookies.jwt;
        const data = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
        const user = await User.find({_id:data["_id"]}).populate("likedSongs").populate("followedArtists");
        const { songId } = req.params
        const song = await Song.find({ _id: songId }).populate("artists");
        res.render('songAuth', { song:song, user:user })
    } catch (e) {
        console.log(e);
        res.status(400).send({'Error': e.message})
    }
}

exports.get_loginPage = async (req, res) => {
    try {
        res.render('login')
    } catch (e) {
        console.log(e)
        res.status(400).send({'Error': e})
    }
}

exports.get_signupPage = async (req, res) => {
    try {
        res.render('signup')
    } catch (e) {
        console.log(e)
        res.status(400).send({'Error': e})
    }
}

exports.post_createNewUser = async (req, res) => {
    try {
        const response = await createNewUser(req.body);
        res.send(response)
    } catch (e) {
        console.log(e)
        res.status(400).send({'Error': e.message})
    }
}

exports.post_login = async (req, res) => {
    try {
        const response = await logInUser(req.body);
        res.cookie("jwt", response, {
            httpOnly: true,
            maxAge: `${3 * 60 * 60 * 1000}`
        })
        res.status(201).json({
            message: "Log in successfully",
            _id: response["_id"]
        })
    } catch (e) {
        console.log(e)
        res.status(400).send({'Error': e.message})
    }
}

exports.get_logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: "1" })
        res.redirect('/home')
    } catch (e) {
        console.log(e)
        res.status(400).send({'Error': e.message})
    }
}

exports.get_searchPage = async (req, res, next) => {
    try {
        const searchTerm = req.query.search || req.query.language
        if (searchTerm) {
            next()
        } else {
            const allSongs = await Song.find({}).populate("artists");
            res.render('search', { allSongs })
        }
    } catch (e) {
        console.log(e)
        res.status(400).send({'Error': e.message})
    }
}

exports.get_editPage = async (req, res) => {
    try {
        const token = req.cookies.jwt;
        const data = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
        const user = await User.find({_id:data["_id"]}).populate("likedSongs").populate("followedArtists");
        res.render('editProfile', { user })
    } catch (e) {
        console.log(e)
        res.status(400).send({'Error': e.message})
    }
}