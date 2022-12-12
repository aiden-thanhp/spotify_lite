const jwt = require("jsonwebtoken");
const path = require('path');
require('dotenv').config(path.join(__dirname, '../.env'));

exports.auth_session = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.JWT_KEY, (err, decodedToken) => {
            if (err) {
                res.redirect('/login')
            } else {
                if (decodedToken.role !== "user") {
                    res.redirect('/login')
                } else {
                    next()
                }
            }
        })
    } else {
        res.redirect('/login')
    }
} 

exports.auth_song = (req, res, next) => {
    const token = req.cookies.jwt;
    const { songId } = req.params
    if (token) {
        jwt.verify(token, process.env.JWT_KEY, (err, decodedToken) => {
            if (err) {
                res.redirect(`/song/${songId}`)
            } else {
                if (decodedToken.role !== "user") {
                    res.redirect(`/song/${songId}`)
                } else {
                    next()
                }
            }
        })
    } else {
        res.redirect(`/song/${songId}`)
    }
} 

exports.auth_search = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.JWT_KEY, (err, decodedToken) => {
            if (err) {
                res.redirect('/search')
            } else {
                if (decodedToken.role !== "user") {
                    res.redirect('/search')
                } else {
                    next()
                }
            }
        })
    } else {
        res.redirect('/search')
    }
} 