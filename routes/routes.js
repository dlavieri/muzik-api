const express = require('express');
const apiRoutes = require('../controllers/index');
const isAuth = require('../controllers/auth');

const router = express.Router();

router.get('/get-home-moods', isAuth, apiRoutes.getHome);

router.get('/moods/:moodId', isAuth, apiRoutes.getMood);

router.post('/add-music', apiRoutes.postSong);

router.put('/new-user', apiRoutes.putUser);

router.post('/login', apiRoutes.login);

router.post('/love-song/:songId', isAuth, apiRoutes.postAddSongToPlaylist);

router.get('/playlists/:playlistname', isAuth, apiRoutes.getPlaylist);

router.post('/playlists/remove-song/:songId', isAuth, apiRoutes.postRemoveSongFromPlaylist);

module.exports = router;