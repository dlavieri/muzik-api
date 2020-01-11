const Sequelize = require('sequelize');

const sequelize = require('./index');

const Mood = sequelize.define('mood', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    img: {
        type: Sequelize.STRING,
        allowNull: true
    },
});

module.exports = Mood;