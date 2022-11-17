const Sequelize = require('Sequelize');
const connection = require('../database/database');

const User = connection.define('users',{
    email: {
        type: Sequelize.STRING,
        allowNull: false
    }, password: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

// User.sync({force: false}) // force true é que o sequelize sempre recriará a tabela mesmo ela já existindo

module.exports = User;