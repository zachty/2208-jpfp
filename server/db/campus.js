const db = require('./database');
const Sequelize = require('sequelize');

module.exports = db.define('campus', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
        },
    },
    imageUrl: {
        type: Sequelize.STRING,
        defaultValue:
            'https://static.vecteezy.com/system/resources/previews/000/353/557/original/building-vector-icon.jpg',
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
        },
    },
    description: {
        type: Sequelize.TEXT,
    },
});
