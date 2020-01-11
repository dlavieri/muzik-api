const Sequelize = require('sequelize');

const sequelize = require('./index');

const PlaylistSong = sequelize.define('playlistSong', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    }
});

module.exports = PlaylistSong;