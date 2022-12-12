const router = require('express').Router();
const ArtistController = require('../controllers/ArtistController');

router.put('/:artist_id', ArtistController.put_userFollowsAnArtist);

module.exports = router;