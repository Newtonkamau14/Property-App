require("dotenv").config();
const { Sequelize } = require('sequelize');


const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    porcess.env.DB_PASSWORD,
    {
        dialect: "mysql",
        host: process.env.HOST
    }
);


const connection = async() => {
    try {
        await sequelize.authenticate();
        console.log('Connected to database')
    } catch (error) {
        console.log(error);
    }
}

module.exports = { sequelize, connection};