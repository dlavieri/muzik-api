const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');


const db = require('./models/index');
const Song = require('./models/song');
const Mood = require('./models/mood');
const Playlist = require('./models/playlist');
const User = require('./models/user');
const PlaylistSong = require('./models/playlist-song');


const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Credentials', true );
    next();
})

app.use(routes);

Mood.hasMany(Song, { constraints: true, onDelete: "CASCADE"});
Song.belongsTo(Mood);
User.hasMany(Playlist, {constraints: true, onDelete: "CASCADE"});
Song.belongsToMany(Playlist, { through: PlaylistSong });
Playlist.belongsToMany(Song, { through: PlaylistSong });


db.sync()
    .then(result => {
        app.listen(process.env.PORT || 3000);
    })
    .catch(err => console.log(err));