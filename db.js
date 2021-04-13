const {Sequelize} = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    ssl: process.env.ENVIRONMENT 
})

// const sequelize = new Sequelize(process.env.DATABASE_URL, {
//     host: process.env.DB_HOST,
//     dialect: process.env.DB_DIALECT
// })

module.exports = sequelize;