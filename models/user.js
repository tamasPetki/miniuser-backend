const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const User = sequelize.define('User', {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.DataTypes.STRING(120),
        allowNull: false
    },
    password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.DataTypes.STRING(120),
        allowNull: false
    }
});


module.exports = User;
