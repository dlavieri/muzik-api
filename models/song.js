const Sequelize = require('sequelize');

const db = require('../util/database');

const Song = db.define('song', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    mp3Path: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    _plays: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
    }
})

module.exports = Song;