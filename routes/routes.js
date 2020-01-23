const express = require('express');
const apiRoutes = require('../controllers/index');
const isAuth = require('../controllers/auth');

const router = express.Router();
// add back in isAuth
router.get('/get-home-moods', apiRoutes.getHome);
// add back in isAuth
router.get('/moods/:moodId', apiRoutes.getMood);

router.post('/add-music', apiRoutes.postSong);

router.post('/new-user', apiRoutes.newUser);

router.post('/login', apiRoutes.login);
// add back in isAuth
router.post('/love-song/:songId', apiRoutes.postAddSongToPlaylist);
// add back in isAuth
router.get('/playlists/:playlistname', apiRoutes.getPlaylist);
// add back in isAuth
router.post('/playlists/remove-song/:songId',  apiRoutes.postRemoveSongFromPlaylist);

module.exports = router;