const Sequelize = require('sequelize');

if (process.env.DATABASE_URL) {
    const sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        protocol: 'postgres'

    })
} else {
    const sequelize = new Sequelize('jamify-muzik', 'davidlavieri', 'lavierinode', {
        host: process.env.DATABASE_URL,
        dialect: 'postgres',
        protocol: 'postgres',
        omitNull: true,
    });
}

// module.exports = sequelize;