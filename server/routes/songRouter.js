const router = require('express').Router();
const SongController = require('../controllers/SongController');

router.get('/', SongController.get_listSongByLanguage);
router.get('/all', SongController.get_listAllSong)
//router.get('/:search', SongController.get_listSongByGenre, SongController.get_listSongByArtist, SongController.get_listSongByTitle);
router.put('/:songId', SongController.put_userLikesASong);

module.exports = router;