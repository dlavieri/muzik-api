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
    }
});


module.exports = User;