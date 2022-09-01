const db = require('./database');
const Sequelize = require('sequelize');

module.exports = db.define('student', {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
            notEmpty: true,
        },
    },
    imageUrl: {
        type: Sequelize.STRING,
        defaultValue:
            'https://riverlegacy.org/wp-content/uploads/2021/07/blank-profile-photo.jpeg',
    },
    gpa: {
        type: Sequelize.DECIMAL,
        validate: {
            max: 4,
            min: 0,
        },
    },
});
