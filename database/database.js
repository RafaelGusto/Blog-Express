const { Sequelize } = require('sequelize');
const sequelize = require('sequelize');

const connection = new Sequelize('bloguinho','root','',{
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00',
});

module.exports = connection;