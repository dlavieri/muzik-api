const Sequelize = require('sequelize');

const sequelize = new Sequelize('jamify-muzik', 'davidlavieri', 'lavierinode', {
    host: 'localhost',
    dialect: 'postgres',
    omitNull: true,
});

module.exports = sequelize;