const Sequelize = require("sequelize"); // Import Sequelize.
const db = require("../db_conf");

module.exports = db.sequelize.define(
    'followedVac',
    {
        memberid: {
            type: Sequelize.INTEGER(20),
            primaryKey: true,
            allowNull: false
        },
        vacationid: {
            type: Sequelize.INTEGER(20),
            primaryKey: true,
            allowNull: false
        }
    }
)