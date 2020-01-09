const Sequelize = require('sequelize');

const sequelize = new Sequelize('jamify-muzik', 'davidlavieri', 'lavierinode', {
    host: process.env.DATABASE_URL,
    dialect: 'postgres',
    protocol: 'postgres',
    omitNull: true,
});

module.exports = sequelize;