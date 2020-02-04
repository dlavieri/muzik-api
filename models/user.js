const Sequelize = require('sequelize');

const sequelize = require('./index');

const User = sequelize.define('user', {
    email: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: true
    },
    location: {
        type: Sequelize.STRING,
        allowNull: true
    },
    img: {
        type: Sequelize.STRING,
        allowNull: true
    }
});


module.exports = User;