const User = require('../models/user');
const Mood = require('../models/mood');
const Song = require('../models/song');
const Playlist = require('../models/playlist');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validatorResult } = require('express-validator');

exports.getHome = (req, res, next) => {
    Mood.findAll()
    .then(moods => {
        return res.json(moods);
    })
    .catch(err => console.log(err));
};

exports.getMood = (req, res, next) => {
    const moodId = req.params.moodId;

    Mood.findOne({where: {_id: moodId}, include: [{model: Song}]})
    .then(mood => {
        if (mood) {
            return res.status(200).json(mood);
        }
    })
    .catch(err => console.log(err));
}

exports.getPlaylist = (req, res, next) => {
    const user = req.userId;
    const playlistName = req.params.playlistname.split("-").join(" ");

    Playlist.findOne({where: {userEmail: user, name: playlistName}, 
        include: [{model: Song}]})
    .then(playlist => {
        if(playlist) {
            return res.status(200).json(playlist)
        }
    })
    .catch(err => {
        console.log(err);
    })
    
}

exports.postSong = (req, res, next) => {
    const songName = req.body.songName;
    const mp3Path = req.body.mp3Path;
    const moodSelect = req.body.mood;

    Mood.findOne({where: {
        name: moodSelect
    }})
    .then(mood => {
        if (!mood) {
            return Mood.create({name: moodSelect});
        }
        return mood;
    })
    .then(mood => {
        return mood.createSong({title: songName, mp3Path: mp3Path })
    })
    .then(() => {
        res.status(202).end();
    })
    .catch(err=> console.log(err))
    
};

exports.newUser = (req, res, next) => {
    const userEmail = req.body.email;
    const userPass = req.body.password;

    User.findByPk(userEmail)
    .then(user => {
        if (user) {
            res.status(303).end();
        }
        return bcrypt.hash(userPass, 12);
    })
    .then(hashedPass => {
        return User.create({email: userEmail, password: hashedPass});
    })
    .then(user => {
        return user.createPlaylist({name: "Liked Tracks"});
    })
    .then(result => {
        return res.status(200).end();
    })
    .catch(err => console.log(err));
};

exports.login = (req, res, next) => {
    const user = req.body.email;
    const pass = req.body.password;

    User.findByPk(user)
    .then(user => {
        if (!user ) {
            return res.status(500).json({error: "User not found"});
        }
        return bcrypt.compare(pass, user.password);
    })
    .then(isEqual => {
        if (!isEqual) {
            return res.status(500).json({error: "Incorrect password"});
        }
        const token = jwt.sign({email: user}, "jamifymuzik", {expiresIn: "1h"});
        return res.status(200).json({token: token, user: user});
    })
    .catch(err => {
        console.log(err);
    })
}

exports.postNewPlaylist = (req, res, next) => {
    const reqUser = '';
    const playlistName = req.body.playlistName;

    User.findByPk(reqUser)
    .then(user => {
        if (!user) {
            res.status(400);
            throw new Error("Not signed in!");
        } else {
            user.createPlaylist({name: playlistName});
            res.status(200);
        }
    })
    .then(() => {
        res.end();
    })
    .catch(err => console.log(err));
};

exports.postAddSongToPlaylist = (req, res, next) => {
    const playlistName = req.body.playlist;
    const songId = req.params.songId;
    let foundUser;

    User.findByPk(req.userId)
    .then(user => {
        foundUser = user;
        return Song.findByPk(songId)
    })
    .then(song => {
        foundUser.getPlaylists({where: {name: playlistName}})
        .then(playlists => {
            return playlists[0].addSong(song);
        })
        return;
    })
    .then(() => {
        res.status(200).end();
    })
    .catch(err => {
        console.log(err);
    })
};

exports.postRemoveSongFromPlaylist = (req, res, next) => {
    const songId = req.params.songId;
    const playlistName = req.body.playlistName;
    const user = req.userId;

    Playlist.findOne({where: {userEmail: user, name: playlistName}})
    .then(playlist => {
        return playlist.getSongs({where: {_id: songId}})
    })
    .then(songs => {
        return songs[0].playlistSong.destroy();
    })
    .then(res => {
        res.status(200).end();
    })
    .catch(err => {
        console.log(err)
    })
};