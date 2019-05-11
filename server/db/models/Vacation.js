const Sequelize = require("sequelize"); // Import Sequelize.
const db = require("../db_conf");
var fs = require('fs');

module.exports = db.sequelize.define(
  'vacation', {
    id: {
      type: Sequelize.INTEGER(20),
      primaryKey: true,
      autoIncrement: true,
      allowNull: true
    },
    description: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    destination: {
      type: Sequelize.STRING(30),
      allowNull: false
    },
    picture: {
      type: Sequelize.TEXT('long'),
      allowNull: false,
    },
    fromdate: {
      type: Sequelize.STRING(30),
      allowNull: false
    },
    todate: {
      type: Sequelize.STRING(30),
      allowNull: false
    },
    price: {
      type: Sequelize.STRING(20),
      allowNull: false
    }, 
    followers: {
      type: Sequelize.INTEGER(30),
      allowNull: false,
      defaultValue: '0'
    }
  });
