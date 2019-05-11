const Sequelize = require('sequelize') // Import Sequelize.
const db = require('../db_conf');

module.exports = db.sequelize.define(
    'member',
    {
        id: {
            type: Sequelize.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        firstName: {
            type: Sequelize.STRING(20),
            allowNull: false
        },
        lastName: {
            type: Sequelize.STRING(20),
            allowNull: false
        },
        user: {
            type: Sequelize.STRING(20),
            allowNull: false,
            unique: true
        },
        pass: {
            type: Sequelize.STRING(30),
            allowNull: false
        },
        isAdmin: {
            type: Sequelize.STRING(10),
            allowNull: false
        }
    }
)