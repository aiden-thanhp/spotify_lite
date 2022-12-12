const router = require('express').Router();
const UserController = require('../controllers/UserController');

router.get('/songs', UserController.get_displayLikedSongs);
router.put('/info', UserController.put_updateInfo)

module.exports = router;