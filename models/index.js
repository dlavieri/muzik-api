'use strict';
const Sequelize = require('sequelize');

let sequelize;
if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres'  });
} else {
  sequelize = new Sequelize('jamify-muzik', 'davidlavieri', 'lavierinode', {
    host: process.env.DATABASE_URL,
    dialect: 'postgres',
    protocol: 'postgres',
    omitNull: true,
});
}


module.exports = sequelize;
