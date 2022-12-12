const router = require('express').Router();
const FrontEndController = require('../controllers/FrontEndController');
const SongController = require('../controllers/SongController')
const { auth_session, auth_song, auth_search } = require('../middleware/auth')

router.get('/home', FrontEndController.get_homePage);
router.get('/login', FrontEndController.get_loginPage);
router.get('/signup', FrontEndController.get_signupPage);
router.post('/signup', FrontEndController.post_createNewUser);
router.post('/login', FrontEndController.post_login);
router.get('/logout', auth_session, FrontEndController.get_logout)
router.get('/auth', auth_session, FrontEndController.get_AuthPage);
router.get('/song/:songId', FrontEndController.get_songPage)
router.get('/auth/likedSongs', auth_session, FrontEndController.get_LikedSongsPage);
router.get('/auth/song/:songId', auth_song, FrontEndController.get_authSongPage);
router.get('/search', FrontEndController.get_searchPage, SongController.get_listSongByLanguage, SongController.get_listSongByGenre, SongController.get_listSongByArtist, SongController.get_listSongByTitle);
router.get('/auth/search', auth_search, FrontEndController.get_searchPage, SongController.get_listSongByLanguage, SongController.get_listSongByGenre, SongController.get_listSongByArtist, SongController.get_listSongByTitle);
router.get('/auth/edit', auth_session, FrontEndController.get_editPage)

module.exports = router;